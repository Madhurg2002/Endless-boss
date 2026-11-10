// ==EMEVD==
// @docs    nr-common.emedf.json
// @compress    DCX_DFLT_10000_44_9
// @game    Sekiro
// @string    "W:\\CL\\data\\Param\\event\\common_func.emevd\u0000W:\\CL\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.2
// ==/EMEVD==

$Event(0, Default, function() {
    SetNPCPartHP(0, 0, 0, false);
    InitializeCommonEvent(0, 90075700, 18005800, 18000810);
    InitializeCommonEvent(0, 90075701, 18000801, 18002800);
    InitializeCommonEvent(0, 90075704, 18000800, 18002800);
    // InitializeCommonEvent(0, 90075901, 18000800, 758000, 907580001);
    InitializeEvent(0, 190075901, 18000800, 758000, 907580001);
    InitializeCommonEvent(0, 90075902, 18005800, 0, 0);
    InitializeCommonEvent(0, 90015012, 18000801, 7511);
    InitializeCommonEvent(0, 90015020, 7511, 18000200);
    InitializeCommonEvent(0, 90015012, 18000800, 18000201);
    InitializeCommonEvent(0, 90015020, 18000201, 18002800);
    InitializeCommonEvent(0, 90075702, 18000801, 18000201, 18002800);
    InitializeCommonEvent(0, 90075703, 18000801, 18000800, 18000810, 18002820, 18002821, 18002822, 18002823, 18002824, 18002825, 18002810, 18000200, 18000201, 18002800);
    InitializeCommonEvent(0, 90075710, 18000800);
    InitializeCommonEvent(0, 90075705, 18000800, 18002830, 18000202, 46093, 23, 18002400, 18002401, 18002800);
    InitializeCommonEvent(0, 90075705, 18000800, 18002830, 18000203, 46094, 1, 18002410, 18002411, 18002800);
    InitializeCommonEvent(0, 90075705, 18000800, 18002830, 18000204, 46095, 5, 18002420, 18002421, 18002800);
    InitializeCommonEvent(0, 90075705, 18000800, 18002830, 18000205, 46096, 6, 18002430, 18002431, 18002800);
    InitializeCommonEvent(0, 90075705, 18000800, 18002830, 18000206, 46097, 3, 18002440, 18002441, 18002800);
    InitializeCommonEvent(0, 90075705, 18000800, 18002830, 18000207, 46098, 7, 18002450, 18002451, 18002800);
    InitializeCommonEvent(0, 90075705, 18000800, 18002830, 18000208, 46099, 2, 18002460, 18002461, 18002800);
    InitializeCommonEvent(0, 90075705, 18000800, 18002830, 18000209, 46105, 11, 18002470, 18002471, 18002800);
    InitializeCommonEvent(0, 90075706, 18000801, 18000800, 18000201, 18002800);
    $InitializeEvent(0, 18002890);
    $InitializeEvent(0, 18002590);
    $InitializeEvent(0, 18002600);
    $InitializeEvent(0, 18002601);
    $InitializeEvent(0, 18002620);
    $InitializeEvent(0, 18002610);
    InitializeCommonEvent(0, 90075930, 160, 9080);
    InitializeCommonEvent(0, 90015200, 9314, 7);
    InitializeCommonEvent(0, 90015201, 9315, 7, 160);
    
    $InitializeEvent(0, 19110900);  // 注册连战事件
    InitializeEvent(0, 19210900, 19000800); // 注册双夜王事件
    // 重写游戏结束事件（连战重要实现：劫持结算事件，在击败夜王前插入连战夜王相关事件）
    $InitializeEvent(0, 19002951);  
    
});

$Event(50, Default, function() {
    $InitializeEvent(0, 18002500);
});

$Event(18002500, Restart, function() {
    DisableNetworkSync();
    EndIf(EventFlag(18002500));
    EndIf(PlayerInMap(11, 0, 0, 0));
    WaitFor(EventFlag(12002001) && PlayerInMap(18, 0, 0, 0));
    FadeToBlack(1, 0, true, -1);
    WaitFixedTimeSeconds(2);
    FadeToBlack(0, 0.5, false, -1);
    EndEvent();
});

$Event(18002590, Default, function() {
    EndIf(IsPlayMode(0) || IsPlayMode(1));
    WaitFor(EventFlag(7512));
    DisplayTextEffectId(4000);
    WaitFixedTimeSeconds(15);
    SetEventFlagID(7000, ON);
});

$Event(18002600, Default, function() {
    WaitFor(
        EventFlag(18002800)
            && EventFlag(18002615)
            && !(CharacterHasSpEffect(20000, 9760) && IsHero(Hero.Wylder)));
    IssueShortWarpRequest(20000, TargetEntityType.Area, 18002600, -1);
    SetCameraAngle(0.84, 164.26);
    EnableAsset(18001900);
});

$Event(18002601, Default, function() {
    DisableCharacter(18000890);
    DisableNetworkSync();
    WaitFor(
        EventFlag(18002800)
            && EventFlag(18002615)
            && CharacterHasSpEffect(20000, 9760)
            && IsHero(Hero.Wylder));
    IssueShortWarpRequest(20000, TargetEntityType.Area, 18002601, -1);
    SetCameraAngle(15.985, -76.26);
    EnableCharacter(18000890);
    SetCharacterTeamType(18000890, TeamType.FriendlyNPC);
    DisableCharacterFadeOnEnable(18000890);
    EnableCharacterDefaultBackread(18000890);
    DisableCharacterGravity(18000890);
    WaitFor(ElapsedFrames(5));
    WaitFor(CharacterBackreadStatus(18000890));
    ForceAnimationPlayback(18000890, 30000, false, false, false);
    WaitFor(ActionButtonInArea(6750, 18000890));
    UnknownTalk2003120(1);
    FadeToBlack(1, 1, true, -1);
    WaitFixedTimeSeconds(1);
    PlayCutsceneToPlayer(18000000, CutscenePlayMode.SkippableWithFadeOutSkip, 10000);
    FadeToBlack(0, 1, true, -1);
    WaitFixedTimeFrames(1);
    SetEventFlagID(961, ON);
    FadeToBlack(1, 0, false, -1);
    WaitFixedTimeFrames(1);
    SetEventFlagID(21, ON);
});

$Event(18002610, Default, function() {
    EndIf(EventFlag(6020));
    EndIf(IsPlayMode(2));
    WaitFor(EventFlag(18002800));
    SetEventFlagID(9017, OFF);
    WaitFixedTimeSeconds(10);
    SpawnOneshotSFX(TargetEntityType.Area, 18002650, -1, 807190);
    PlaySE(20000, SoundType.EnvironmentalSound, 180000010);
    WaitFixedTimeSeconds(3);
    FadeToWhite(0, 0, false, 0);
    WaitFixedTimeFrames(1);
    FadeToWhite(1, 0.5, true, 0);
    WaitFixedTimeSeconds(0.5);
    ChangeWeather(Weather.Type85, -1, true);
    SetEventFlagID(18002615, ON);
    DisableAsset(18001510);
    WaitFixedTimeSeconds(0.8);
    FadeToWhite(0, 1.2, true, 0);
    WaitFixedTimeSeconds(1.2);
    FadeToBlack(0, 3, false, 2);
});

$Event(18002620, Default, function() {
    EndIf(EventFlag(6020));
    EndIf(IsPlayMode(2));
    WaitFor(EventFlag(18002800) && EventFlag(18002615));
    SetEventFlagID(6020, ON);
    // Endless: the expedition never finalises on its own
});

$Event(18002800, Default, function(chrEntityId) {
    if (!EventFlag(18002800)) {
        WaitFor(HPRatio(chrEntityId) <= 0);
        WaitFixedTimeSeconds(5);
        DisplayBossHealthBar(Disabled, 18000800, 0, 0);
        DisplayTextEffectId(1040);
        SetBossBGM(758000, BossBGMState.Stop2);
        IncrementTeamBossesKilled(1);
        // Endless: 7512 (expedition finished) is never set
        DisplayNetworkconnectedPermanentBuffPopup(130);
        SetSpEffect(20000, 9730);
        SetNetworkconnectedEventFlagID(18002800, ON);
    }
L1:
    NoOp();
});

$Event(18002801, Restart, function(chrEntityId, nameId, chrEntityId2, nameId2) {
    if (EventFlag(18002800)) {
        DisableCharacter(chrEntityId2);
        DisableCharacterCollision(chrEntityId2);
        ForceCharacterDeath(chrEntityId2, false);
        DisableCharacter(chrEntityId);
        DisableCharacterCollision(chrEntityId);
        ForceCharacterDeath(chrEntityId, false);
        EndEvent();
    }
L0:
    DisableCharacterAI(chrEntityId2);
    DisableCharacter(chrEntityId);
    DisableCharacterCollision(chrEntityId);
    DisableCharacterAI(chrEntityId);
    DisableCharacterCollision(18000810);
    DisableCharacterAI(18000810);
    EnableCharacterImmortality(18000810);
    ForceAnimationPlayback(chrEntityId2, 30029, true, false, false);
    WaitFor(
        InArea(10000, 18002801)
            || HasDamageType(chrEntityId2, 0, DamageType.Any)
            || CharacterHasStateInfo(chrEntityId2, 436)
            || CharacterHasStateInfo(chrEntityId2, 2)
            || CharacterHasStateInfo(chrEntityId2, 5)
            || CharacterHasStateInfo(chrEntityId2, 6)
            || CharacterHasStateInfo(chrEntityId2, 260));
    SetNetworkconnectedEventFlagID(7511, ON);
    ForceAnimationPlayback(chrEntityId2, 20029, false, false, false);
    DisableCharacterHPBarDisplay(chrEntityId2);
    EnableCharacterAI(chrEntityId2);
    SetNetworkUpdateRate(chrEntityId2, true, CharacterUpdateFrequency.AlwaysUpdate);
    DisplayBossHealthBar(Enabled, chrEntityId2, 0, nameId2);
    SetBossBGM(758000, BossBGMState.Start);
    DisplayBossHealthBar(Disabled, chrEntityId, 0, nameId);
});

$Event(18002802, Restart, function(chrEntityId, nameId, chrEntityId2, nameId2) {
    EndIf(EventFlag(18002800));
    WaitFor(CharacterHasSpEffect(chrEntityId2, 46082));
    SetCharacterTeamType(chrEntityId2, TeamType.Object);
    WaitFixedTimeSeconds(10);
    FadeToBlack(1, 1, true, -1);
    WarpCharacterAndCopyFloorUnknown200489(10000, TargetEntityType.Area, 18002820, -1, 10000, -1, -1);
    WaitFixedTimeSeconds(1);
    EnableCharacter(chrEntityId);
    WaitFixedTimeFrames(1);
    WarpCharacterAndCopyFloor(chrEntityId, TargetEntityType.Area, 18002810, -1, chrEntityId2);
    ForceAnimationPlayback(chrEntityId, 20011, false, false, false);
    WaitFixedTimeFrames(1);
    EnableCharacterCollision(chrEntityId);
    EnableCharacterAI(chrEntityId);
    SetCharacterEventTarget(chrEntityId, 18000810);
    ChangeWeather(Weather.Type87, -1, true);
    DisplayBossHealthBar(Disabled, chrEntityId2, 0, nameId2);
    WaitFixedTimeSeconds(2);
    SetCameraAngle(5.42, 0);
    FadeToBlack(0, 2, false, 1);
    WaitFixedTimeSeconds(2);
    DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
});

$Event(18002803, Restart, function(chrEntityId, chrEntityId2) {
    EndIf(EventFlag(18002800));
    WaitFor(CharacterHasSpEffect(chrEntityId, 46085));
    DisableCharacterCollision(chrEntityId2);
    DisableCharacter(chrEntityId2);
});

$Event(18002804, Restart, function(chrEntityId) {
    EndIf(EventFlag(18002800));
    WaitFor(CharacterHasSpEffect(chrEntityId, 46089));
    ChangeWeather(Weather.Type88, -1, true);
});

$Event(18002805, Restart, function(eventFlagId, bgmBossConvParamId, eventFlagId2, eventFlagId3, value, value2) {
    DisableNetworkSync();
    if (EventFlag(eventFlagId)) {
        EndEvent();
    }
L0:
    WaitFor(EventFlag(eventFlagId2));
    WaitFixedTimeFrames(1);
    if (!EventFlag(eventFlagId3)) {
        SetBossBGM(bgmBossConvParamId, BossBGMState.Start);
    }
    WaitFor(EventFlag(eventFlagId3) || EventFlag(eventFlagId));
    if (!EventFlag(eventFlagId)) {
        WaitFixedTimeFrames(1);
        if (Signed(value) != 0) {
        }
        SetBossBGM(bgmBossConvParamId, BossBGMState.HeatUp);
        WaitFor(EventFlag(eventFlagId));
    }
L1:
    if (Signed(value2) != 1) {
        SetBossBGM(bgmBossConvParamId, BossBGMState.Stop2);
        EndEvent();
    }
    SetBossBGM(bgmBossConvParamId, BossBGMState.Stop1);
});

$Event(18002810, Restart, function(chrEntityId) {
    EndIf(EventFlag(18002800));
    if (!EventFlag(18002810)) {
        WaitFor(CharacterHasSpEffect(chrEntityId, 46089));
        ForceAnimationPlayback(18001510, 100, false, true, false);
    }
    ForceAnimationPlayback(18001510, 101, true, false, false);
});

$Event(18002850, Restart, function(eventFlagId, eventFlagId2, bgmBossConvParamId, chrEntityId, spEffectId, targetAmount, state) {
    EndIf(EventFlag(eventFlagId2));
    if (eventFlagId != 0) {
        WaitFor(EventFlag(eventFlagId));
    }
    if (Signed(0) != spEffectId) {
        WaitFor(CharacterHasSpEffect(chrEntityId, spEffectId, GreaterOrEqual, 1));
    } else {
        WaitFor(CharacterRatioHPRatio(chrEntityId, NotEqual, 0) <= targetAmount);
    }
    SetBossBGM(bgmBossConvParamId, state);
});

$Event(18002890, Restart, function() {
    WaitFor(EventFlag(7512));
    SetNetworkconnectedEventFlagID(18000800, ON);
    SetNetworkconnectedEventFlagID(18002800, ON);
});


// ----------------- 夜王连战系统 ------------------
$Event(19110900, Default, function()
{
    SetNetworkconnectedEventFlagID(19002951, OFF);
    SetNetworkconnectedEventFlagID(19002952, OFF);
    SetNetworkconnectedEventFlagID(19002953, OFF);
    SetNetworkconnectedEventFlagID(19002954, OFF);
    SetNetworkconnectedEventFlagID(19002955, OFF);   // 连战夜王开始初始化FLAG
    SetNetworkconnectedEventFlagID(19002956, OFF);   // 连战夜王初始化成功FLAG
        SetNetworkconnectedEventFlagID(19300002, OFF);   // endless: first round done
    SetNetworkconnectedEventFlagID(19300999, OFF);   // endless: never set (loop stop)
    SetNetworkconnectedEventFlagID(19300101, OFF);   // endless: kill counter
    SetNetworkconnectedEventFlagID(19300102, OFF);   // endless: kill counter
    SetNetworkconnectedEventFlagID(19300103, OFF);   // endless: kill counter
    SetNetworkconnectedEventFlagID(19300104, OFF);   // endless: kill counter
    SetNetworkconnectedEventFlagID(19300105, OFF);   // endless: kill counter
    SetNetworkconnectedEventFlagID(19300010, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300011, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300012, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300013, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300014, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300015, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300020, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300021, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300022, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300023, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300024, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19300025, OFF);   // endless: round pick
    SetNetworkconnectedEventFlagID(19002957, OFF);   // 连战魔像FLAG
    
    // 连战夜王：圣牢布
    DisableCharacter(19111803);
    DisableCharacterAI(19111803);
    DisableCharacterCollision(19111803);
    
    $InitializeEvent(0, 19113900);
    
    // 连战夜王：米塔恩
    DisableCharacter(19110880);
    DisableCharacterAI(19110880);
    DisableCharacterCollision(19110880);

    $InitializeEvent(0, 19113901);      
    
    // 连战夜王：王三狼
    DisableCharacter(19110800);
    DisableCharacter(19115801);
    DisableCharacterAI(19110800);
    DisableCharacterAI(19115801);
    DisableCharacterCollision(19110800);
    DisableCharacterCollision(19115801);
    
    $InitializeEvent(0, 19113902);
    
    // 连战夜王：王人马
    DisableCharacter(19110850);
    DisableCharacterAI(19110850);
    DisableCharacterCollision(19110850);
    
    $InitializeEvent(0, 19113903);
    
    // 连战夜王：王冰龙
    DisableCharacter(19110860);
    DisableCharacterAI(19110860);
    DisableCharacterCollision(19110860);
    
    $InitializeEvent(0, 19113904);
    
    // 连战夜王：垃圾王
    DisableCharacter(19110870);
    DisableCharacterAI(19110870);
    DisableCharacterCollision(19110870);
    
    $InitializeEvent(0, 19113905);
    
    // 连战开关：魔像 removed - the golem never spawns, so the gate opens at once
    DisableCharacter(19110888);
    DisableCharacterAI(19110888);
    DisableCharacterCollision(19110888);
    SetNetworkconnectedEventFlagID(19002957, ON);

    // ===== ENDLESS GAUNTLET: banner on map load =====
    // Proof the mod's scripts are live, before the first kill.
    WaitFixedTimeSeconds(3);
    DisplayTextEffectId(6015);
    EndEvent();
});


// 入侵夜王系统（双夜王）
$Event(19210900, Default, function(chrEntityId)
{
    SetNetworkconnectedEventFlagID(19002971, OFF);   // 双BOSS战flag
    SetNetworkconnectedEventFlagID(19002972, OFF);   // 入侵夜王击败FLAG
    SetNetworkconnectedEventFlagID(19002973, OFF);   // 击败粪金龟FLAG
    SetNetworkconnectedEventFlagID(19002974, OFF);   // 入侵夜王可发动登场技FLAG
    SetNetworkconnectedEventFlagID(19002975, OFF);   // 入侵夜王准备登场FLAG
    SetNetworkconnectedEventFlagID(19002976, OFF);   // 入侵夜王已登场FLAG
    SetNetworkconnectedEventFlagID(19002977, OFF);   // 第一BOSS死亡FLAG(取消减攻击力BUFF用)
    
    // 小狼入侵: EntityID: 19210800  NameID:907500000
    if (RandomAppearLot(19210800)) {
        InitializeCommonEvent(0, 90075100, 19210800);
        InitializeCommonEvent(0, 90015012, 19210800, 7511);        
        InitializeEvent(0, 19212818, 19210800, 907500000, 20029);
        InitializeEvent(0, 19212819, 19210800);
        InitializeEvent(0, 19212820, 19210800, 3034);
        DisableCharacter(19214191);
        DisableCharacterAI(19214191);
        DisableCharacterCollision(19214191);   // scarab removed

        WaitFor(HPRatio(chrEntityId) < 0.7);
        SetNetworkconnectedEventFlagID(19002973, ON);   // scarab removed: invasion unlocked
        DisplayTextEffectId(6019);
        SetNetworkconnectedEventFlagID(19002975, ON);
    }
    
    // 小嘴入侵: EntityID: 19210810  NameID:907510000
    if (RandomAppearLot(19210810)) {
        InitializeCommonEvent(0, 90075100, 19210810);
        InitializeCommonEvent(0, 90015012, 19210810, 7511);        
        InitializeEvent(0, 19212818, 19210810, 907510000, 20029);
        InitializeEvent(0, 19212819, 19210810);
        DisableCharacter(19214191);
        DisableCharacterAI(19214191);
        DisableCharacterCollision(19214191);   // scarab removed
        
        WaitFor(HPRatio(chrEntityId) < 0.7);
        SetNetworkconnectedEventFlagID(19002973, ON);   // scarab removed: invasion unlocked
        DisplayTextEffectId(6019);
        SetNetworkconnectedEventFlagID(19002975, ON);
    }
    
    // 小羊入侵: EntityID: 19210840  NameID:907550000
    if (RandomAppearLot(19210840)) {
        InitializeCommonEvent(0, 90075100, 19210840);
        InitializeCommonEvent(0, 90015012, 19210840, 7511);        
        InitializeEvent(0, 19212818, 19210840, 907550000, 20029);
        InitializeEvent(0, 19212819, 19210840);
        DisableCharacter(19214191);
        DisableCharacterAI(19214191);
        DisableCharacterCollision(19214191);   // scarab removed
        
        WaitFor(HPRatio(chrEntityId) < 0.7);
        SetNetworkconnectedEventFlagID(19002973, ON);   // scarab removed: invasion unlocked
        DisplayTextEffectId(6019);
        SetNetworkconnectedEventFlagID(19002975, ON);
    }
    
    // 小马入侵: EntityID: 19210850  NameID:907610000
    if (RandomAppearLot(19210850)) {
        InitializeCommonEvent(0, 90075100, 19210850);
        InitializeCommonEvent(0, 90015012, 19210850, 7511);        
        InitializeEvent(0, 19212818, 19210850, 907610000, 20029);
        InitializeEvent(0, 19212819, 19210850);
        DisableCharacter(19214191);
        DisableCharacterAI(19214191);
        DisableCharacterCollision(19214191);   // scarab removed
        
        WaitFor(HPRatio(chrEntityId) < 0.7);
        SetNetworkconnectedEventFlagID(19002973, ON);   // scarab removed: invasion unlocked
        DisplayTextEffectId(6019);
        SetNetworkconnectedEventFlagID(19002975, ON);
    }
    
    // 小龙入侵: EntityID: 19210860  NameID:907620000
    if (RandomAppearLot(19210860)) {
        InitializeCommonEvent(0, 90075100, 19210860);
        InitializeCommonEvent(0, 90015012, 19210860, 7511);        
        InitializeEvent(0, 19212818, 19210860, 907620000, 20029);
        InitializeEvent(0, 19212819, 19210860);
        DisableCharacter(19214191);
        DisableCharacterAI(19214191);
        DisableCharacterCollision(19214191);   // scarab removed
        
        WaitFor(HPRatio(chrEntityId) < 0.7);
        SetNetworkconnectedEventFlagID(19002973, ON);   // scarab removed: invasion unlocked
        DisplayTextEffectId(6019);
        SetNetworkconnectedEventFlagID(19002975, ON);
    }
    
    // 龙王入侵: EntityID: 19210817  NameID:907620001
    // 贝勒入侵: EntityID: 19210818  NameID:907510001
    
    EndEvent();
});


// ================= 连战BOSS【圣牢布】初始化相关事件===========
$Event(19113900, Default, function() {
    $InitializeEvent(0, 19114900);
    // Endless: 190017580 removed (it ends the run on death)
    InitializeEvent(0, 190075851, 19111803, 907580002);
    
    $InitializeEvent(0, 19309000, 19111803, 758000, 907580001, 19300020);
    InitializeCommonEvent(0, 90075902, 19005800, 19111803, 0);
    InitializeCommonEvent(0, 90015012, 19111803, 19002953);
    InitializeCommonEvent(0, 90075710, 19111803);
    
    SetNetworkconnectedEventFlagID(19002956, ON);
    EndEvent();
});

// ================= 连战BOSS【圣牢布】激活相关事件相关事件===========
$Event(19114900, Restart, function() {
    // ===== ENDLESS GAUNTLET: one spawn per round =====
    // Explicit loop: each pass arms this Nightlord for one round of the gauntlet.
    WaitFor(EventFlag(19002951));
    if (EventFlag(7512)) {
        WaitFor(EventFlag(19300999));   // expedition finished - stop spawning
    }
L0:
    // wait until the round manager rolls this Nightlord
    WaitFor(EventFlag(19002952) && EventFlag(19300020));

    // bring the boss back for this round (it was disabled by the death handler)
    EnableCharacter(19111803);

    EnableCharacter(19111803);
        WaitFixedTimeFrames(1);
        WarpCharacterAndCopyFloor(19111803, TargetEntityType.Area, 19002910, -1, 19113910);
    
        ChangeWeather(Weather.Type87, -1, true);
        SetCharacterEventTarget(19111803, 19000910);
    
        WaitFor(ElapsedSeconds(1));
        SetNetworkconnectedEventFlagID(19002955, ON);
        SetCameraAngle(5.42, 0);
        WaitFixedTimeSeconds(3);
        FadeToBlack(0, 2, false, 1);
        ForceAnimationPlayback(19111803, 20006, false, false, false);
        EnableCharacterAI(19111803);
        WaitFixedTimeSeconds(1);
    
        SetNetworkconnectedEventFlagID(19002953, ON);

    // round finished - the death handler clears the fight flag
    WaitFor(!EventFlag(19002952));
    Goto(L0);
});

// ================= 连战BOSS【米塔恩】初始化相关事件===========
$Event(19113901, Default, function() {
    $InitializeEvent(0, 19114901);
    InitializeEvent(0, 190075501, 19110880, 907610001);
    InitializeEvent(0, 190075900, 19110880);
    
    $InitializeEvent(0, 19309000, 19110880, 760000, 907610001, 19300021);
    InitializeCommonEvent(0, 90075902, 19110880, 0, 0);
    InitializeCommonEvent(0, 90075500, 19110880);
    InitializeCommonEvent(0, 90015012, 19110880, 19002953);
    InitializeCommonEvent(0, 90015020, 19002953, 7512);
    InitializeCommonEvent(0, 90015008, 19002953, 7512, 760000, 19110880, 5105, 0);
    InitializeCommonEvent(0, 90075910, 19002953, 7512, 19006850, 19110880, 5108, 0);
    InitializeCommonEvent(0, 90075910, 19002953, 7512, 19006851, 19110880, 5108, 0);
    InitializeCommonEvent(0, 90075910, 19002953, 7512, 19006852, 19110880, 5108, 0);
    
    SetNetworkconnectedEventFlagID(19002956, ON);
    EndEvent();
});

// ================= 连战BOSS【米塔恩】激活相关事件相关事件===========
$Event(19114901, Restart, function() {
    // ===== ENDLESS GAUNTLET: one spawn per round =====
    // Explicit loop: each pass arms this Nightlord for one round of the gauntlet.
    WaitFor(EventFlag(19002951));
    if (EventFlag(7512)) {
        WaitFor(EventFlag(19300999));   // expedition finished - stop spawning
    }
L0:
    // wait until the round manager rolls this Nightlord
    WaitFor(EventFlag(19002952) && EventFlag(19300021));

    // bring the boss back for this round (it was disabled by the death handler)
    EnableCharacter(19110880);

    InitializeCommonEvent(0, 90075520, 19002953, 7512, 0, 19110880, 5108, 0);
        DisableCharacterAI(19110880);
        WaitFor(ElapsedSeconds(1));
        SetNetworkconnectedEventFlagID(19002955, ON);
        SetCameraAngle(5.42, 0);
        WaitFixedTimeSeconds(3);
        FadeToBlack(0, 2, false, 1);
    
        ForceAnimationPlayback(19110880, 30029, true, false, false);
        WaitFixedTimeSeconds(1);
        SetNetworkconnectedEventFlagID(19002953, ON);

    // round finished - the death handler clears the fight flag
    WaitFor(!EventFlag(19002952));
    Goto(L0);
});

// ================= 连战BOSS【王三狼】初始化相关事件===========
$Event(19113902, Default, function() {
    $InitializeEvent(0, 19114902);
    InitializeEvent(0, 190075051, 19110800, 19115801, 19110801, 19110802);
    InitializeEvent(0, 290075950, 750000, 19110800, 5106, 0);

    $InitializeEvent(0, 19309000, 19110800, 750000, 907500000, 19300022);
    InitializeEvent(0, 190075902, 19110800, 19115801, 0);
    InitializeCommonEvent(0, 90015012, 19110800, 19002953);
    InitializeCommonEvent(1, 90015012, 19115801, 19002953);
    InitializeCommonEvent(0, 90015020, 19002953, 7512);
    InitializeCommonEvent(0, 90075000, 19110800, 19115801);
    InitializeCommonEvent(0, 90075002, 19110800, 19110801, 19110802);
    InitializeCommonEvent(0, 90075005, 19110800, 19110801, 72, 5900);
    InitializeCommonEvent(0, 90075005, 19110800, 19110802, 2, 5901);
    InitializeCommonEvent(0, 90075006, 19110800, 19110801);
    InitializeCommonEvent(0, 90075006, 19110800, 19110802);
    InitializeCommonEvent(0, 90075060, 19110800, 19110801);
    InitializeCommonEvent(0, 90075060, 19110800, 19110802);
    InitializeCommonEvent(0, 90075070, 19110800, 19110801, 72, 5908, 51320);
    InitializeCommonEvent(0, 90075070, 19110800, 19110802, 72, 5909, 51321);
    InitializeCommonEvent(0, 90075910, 6001, 7512, 19006800, 19110800, 0, 1065353216);
    InitializeCommonEvent(0, 90075910, 6001, 7512, 19006801, 19110800, 0, 1065353216);
    InitializeCommonEvent(0, 90075910, 6001, 7512, 19006802, 19110800, 0, 1065353216);
    InitializeEvent(0, 190075008, 6001, 7512, 0, 19110800, 0, 1065353216);

    SetNetworkconnectedEventFlagID(19002956, ON);
    EndEvent();
});

// ================= 连战BOSS【王三狼】激活相关事件相关事件===========
$Event(19114902, Restart, function() {
    // ===== ENDLESS GAUNTLET: one spawn per round =====
    // Explicit loop: each pass arms this Nightlord for one round of the gauntlet.
    WaitFor(EventFlag(19002951));
    if (EventFlag(7512)) {
        WaitFor(EventFlag(19300999));   // expedition finished - stop spawning
    }
L0:
    // wait until the round manager rolls this Nightlord
    WaitFor(EventFlag(19002952) && EventFlag(19300022));

    // bring the boss back for this round (it was disabled by the death handler)
    EnableCharacter(19110800);
    EnableCharacter(19115801);

    WaitFor(ElapsedSeconds(1));
        SetNetworkconnectedEventFlagID(19002955, ON);
        SetCameraAngle(5.42, 0);
        WaitFixedTimeSeconds(3);
        FadeToBlack(0, 2, false, 1);
        WaitFixedTimeSeconds(1);
        SetNetworkconnectedEventFlagID(19002953, ON);

    // round finished - the death handler clears the fight flag
    WaitFor(!EventFlag(19002952));
    Goto(L0);
});


// ================= 连战BOSS【王人马】初始化相关事件===========
$Event(19113903, Default, function() {
    $InitializeEvent(0, 19114903);
    InitializeEvent(0, 190075551, 19110850);
    InitializeEvent(0, 290075950, 760000, 19110850, 5106, 0);

    InitializeCommonEvent(0, 90015012, 19110850, 19002953);
    InitializeCommonEvent(0, 90015020, 19002953, 7512);
    InitializeCommonEvent(0, 90075902, 19110850, 0, 0);
    $InitializeEvent(0, 19309000, 19110850, 760000, 907610000, 19300023);
    InitializeCommonEvent(0, 90075500, 19110850);
    InitializeCommonEvent(0, 90075510, 19110850);
    InitializeCommonEvent(0, 90075910, 19002953, 7512, 19006850, 19110850, 5108, 0);
    InitializeCommonEvent(0, 90075910, 19002953, 7512, 19006851, 19110850, 5108, 0);
    InitializeCommonEvent(0, 90075910, 19002953, 7512, 19006852, 19110850, 5108, 0);
    
    SetNetworkconnectedEventFlagID(19002956, ON);
    EndEvent();
});

// ================= 连战BOSS【王人马】激活相关事件相关事件===========
$Event(19114903, Restart, function() {
    // ===== ENDLESS GAUNTLET: one spawn per round =====
    // Explicit loop: each pass arms this Nightlord for one round of the gauntlet.
    WaitFor(EventFlag(19002951));
    if (EventFlag(7512)) {
        WaitFor(EventFlag(19300999));   // expedition finished - stop spawning
    }
L0:
    // wait until the round manager rolls this Nightlord
    WaitFor(EventFlag(19002952) && EventFlag(19300023));

    // bring the boss back for this round (it was disabled by the death handler)
    EnableCharacter(19110850);

    InitializeCommonEvent(0, 90075520, 19002953, 7512, 0, 19110850, 0, 1065353216);
        WaitFor(ElapsedSeconds(1));
        SetNetworkconnectedEventFlagID(19002955, ON);
        SetCameraAngle(5.42, 0);
        WaitFixedTimeSeconds(3);
        FadeToBlack(0, 2, false, 1);
        WaitFixedTimeSeconds(1);

        SetNetworkconnectedEventFlagID(19002953, ON);

    // round finished - the death handler clears the fight flag
    WaitFor(!EventFlag(19002952));
    Goto(L0);
});

// ================= 连战BOSS【王冰龙】初始化相关事件===========
$Event(19113904, Default, function() {
    $InitializeEvent(0, 19114904);
    InitializeEvent(0, 191175651, 19110860);
    InitializeEvent(0, 290075950, 490000, 19110860, 5106, 0);

    InitializeCommonEvent(0, 90015012, 19110860, 19002953);
    InitializeCommonEvent(0, 90015020, 19002953, 7512);
    InitializeCommonEvent(0, 90075902, 19110860, 0, 0);
    $InitializeEvent(0, 19309000, 19110860, 490000, 907620000, 19300024);
    InitializeCommonEvent(0, 90075600, 19110860, 19102860);
    InitializeCommonEvent(0, 90075610, 19110860);
    InitializeEvent(0, 191175652, 19110860, 5105, 5106);
    InitializeCommonEvent(0, 90075602, 19110860);
    InitializeCommonEvent(0, 90075660, 19110860, 51001, 51002, 51030, 15, 120, 10, 1, 11, 6, 0, 1, 0, 1, 0, 1);
    InitializeCommonEvent(0, 90075660, 19110860, 51003, 51004, 51031, 16, 130, 20, 2, 21, 3, 22, 4, 23, 5, 24, 8);
    InitializeCommonEvent(0, 90075660, 19110860, 51005, 51006, 51032, 17, 60, 30, 9, 31, 10, 32, 11, 33, 12, 0, 1);
    InitializeCommonEvent(0, 90075660, 19110860, 51007, 51008, 51033, 18, 120, 40, 7, 0, 1, 0, 1, 0, 1, 0, 1);
    
    InitializeCommonEvent(0, 90075910, 19002953, 7512, 19006860, 19110860, 5108, 0);
    InitializeCommonEvent(0, 90075910, 19002953, 7512, 19006861, 19110860, 5108, 0);
    InitializeCommonEvent(0, 90075910, 19002953, 7512, 19006862, 19110860, 5108, 0);
    
    SetNetworkconnectedEventFlagID(19002956, ON);
    EndEvent();
});

// ================= 连战BOSS【王冰龙】激活相关事件相关事件===========
$Event(19114904, Restart, function() {
    // ===== ENDLESS GAUNTLET: one spawn per round =====
    // Explicit loop: each pass arms this Nightlord for one round of the gauntlet.
    WaitFor(EventFlag(19002951));
    if (EventFlag(7512)) {
        WaitFor(EventFlag(19300999));   // expedition finished - stop spawning
    }
L0:
    // wait until the round manager rolls this Nightlord
    WaitFor(EventFlag(19002952) && EventFlag(19300024));

    // bring the boss back for this round (it was disabled by the death handler)
    EnableCharacter(19110860);

    InitializeCommonEvent(0, 99075620, 19002953, 7512, 0, 19110860, 0, 1065353216);
        WaitFor(ElapsedSeconds(1));
        SetNetworkconnectedEventFlagID(19002955, ON);
        SetCameraAngle(5.42, 0);
        WaitFixedTimeSeconds(3);
        FadeToBlack(0, 2, false, 1);
        WaitFixedTimeSeconds(1);
        SetNetworkconnectedEventFlagID(19002953, ON);

    // round finished - the death handler clears the fight flag
    WaitFor(!EventFlag(19002952));
    Goto(L0);
});

// ================= 连战BOSS【垃圾王】初始化相关事件===========
$Event(19113905, Default, function() {
    $InitializeEvent(0, 19114905);
    InitializeEvent(0, 190075770, 19110870, 16122810, 16120220);
    InitializeEvent(0, 190075752, 19110870, 16120220);
    $InitializeEvent(0, 19309000, 19110870, 761000, 907630001, 19300025);
    InitializeEvent(0, 190075780, 19110870, 16120220);
    InitializeEvent(0, 190075773, 19110870, 16120220);
    InitializeEvent(0, 190075774, 19110870, 16122890);
    InitializeCommonEvent(0, 90015012, 19110870, 19002953);
    InitializeCommonEvent(0, 90015020, 19002953, 7512);
    InitializeCommonEvent(0, 90075902, 19110870, 0, 0);
    
    SetNetworkconnectedEventFlagID(19002956, ON);
    EndEvent();
});

// ================= 连战BOSS【垃圾王】激活相关事件相关事件===========
$Event(19114905, Restart, function() {
    // ===== ENDLESS GAUNTLET: one spawn per round =====
    // Explicit loop: each pass arms this Nightlord for one round of the gauntlet.
    WaitFor(EventFlag(19002951));
    if (EventFlag(7512)) {
        WaitFor(EventFlag(19300999));   // expedition finished - stop spawning
    }
L0:
    // wait until the round manager rolls this Nightlord
    WaitFor(EventFlag(19002952) && EventFlag(19300025));

    // bring the boss back for this round (it was disabled by the death handler)
    EnableCharacter(19110870);

    InitializeCommonEvent(0, 90075758, 0);
        InitializeCommonEvent(0, 90075771, 19110870, 16126800, 16120220);

        EnableCharacter(19110870);
        DisableCharacterAI(19110870);
        EnableCharacterImmortality(19110870);
        WaitFixedTimeFrames(1);
        WarpCharacterAndCopyFloor(19110870, TargetEntityType.Area, 19002910, -1, 19113910);
        ForceAnimationPlayback(19110870, 30029, true, false, false);
        InitializeCommonEvent(0, 90075760, 19110870);
        WaitFor(ElapsedSeconds(1));
        SetNetworkconnectedEventFlagID(19002955, ON);
        SetCameraAngle(5.42, 0);
        WaitFixedTimeSeconds(3);
        FadeToBlack(0, 2, false, 1);

        WaitFixedTimeSeconds(2);
        SetNetworkconnectedEventFlagID(19002953, ON);

    // round finished - the death handler clears the fight flag
    WaitFor(!EventFlag(19002952));
    Goto(L0);
});


// =========重要：第一场夜王战结束后转连战夜王事件===========
$Event(19002951, Restart, function() {
    // ===== ENDLESS GAUNTLET: round manager =====
    // The loop is written out explicitly (label + Goto) because an event body that
    // simply reaches its end does NOT start over - only RestartEvent() or Goto loop.
    WaitFor(EventFlag(19002951));
    if (EventFlag(7512)) {
        WaitFor(EventFlag(19300999));   // expedition finished - stop the gauntlet
    }
L0:
    SetNetworkconnectedEventFlagID(19002952, OFF);
    SetNetworkconnectedEventFlagID(19002953, OFF);
    SetNetworkconnectedEventFlagID(19002955, OFF);

    if (!EventFlag(19300002)) {
        WaitFixedTimeSeconds(8);
        DisplayTextEffectId(6015);
        WaitFixedTimeSeconds(3);
        SetNetworkconnectedEventFlagID(19300002, ON);
    } else {
        WaitFixedTimeSeconds(4);
    }

    FadeToBlack(1, 1, true, -1);
    WaitFor(ElapsedSeconds(1));

    if (IsPlayerNo(1)) {
        WarpCharacterAndCopyFloorUnknown200489(10002, TargetEntityType.Area, 19002920, -1, 10002, -1, -1);
    }
    if (IsPlayerNo(2)) {
        WarpCharacterAndCopyFloorUnknown200489(10003, TargetEntityType.Area, 19002921, -1, 10003, -1, -1);
    }
    if (IsPlayerNo(3)) {
        WarpCharacterAndCopyFloorUnknown200489(10004, TargetEntityType.Area, 19002922, -1, 10004, -1, -1);
    }
    if (IsPlayerNo(4)) {
        WarpCharacterAndCopyFloorUnknown200489(10005, TargetEntityType.Area, 19002923, -1, 10005, -1, -1);
    }
    if (IsPlayerNo(5)) {
        WarpCharacterAndCopyFloorUnknown200489(10006, TargetEntityType.Area, 19002924, -1, 10006, -1, -1);
    }
    if (IsPlayerNo(6)) {
        WarpCharacterAndCopyFloorUnknown200489(10007, TargetEntityType.Area, 19002925, -1, 10007, -1, -1);
    }

    // ===== ENDLESS GAUNTLET: roll the Nightlord for this round =====
    // The host sets one random flag of the six; they are network-connected, so
    // every co-op peer sees the same pick.
    BatchSetNetworkconnectedEventFlags(19300010, 19300015, OFF);
    BatchSetNetworkconnectedEventFlags(19300020, 19300025, OFF);
    RandomlySetNetworkconnectedEventFlagInRange(19300010, 19300015, ON);
    // resolve the roll to exactly one family - never two in the same round
    if (EventFlag(19300010)) {
        SetNetworkconnectedEventFlagID(19300020, ON);
    } else if (EventFlag(19300011)) {
        SetNetworkconnectedEventFlagID(19300021, ON);
    } else if (EventFlag(19300012)) {
        SetNetworkconnectedEventFlagID(19300022, ON);
    } else if (EventFlag(19300013)) {
        SetNetworkconnectedEventFlagID(19300023, ON);
    } else if (EventFlag(19300014)) {
        SetNetworkconnectedEventFlagID(19300024, ON);
    } else if (EventFlag(19300015)) {
        SetNetworkconnectedEventFlagID(19300025, ON);
    } else {
        SetNetworkconnectedEventFlagID(19300020, ON);   // roll failed - default family
    }

    SetNetworkconnectedEventFlagID(19002952, ON);

    // the death handler clears 19002952 when this round's Nightlord is dead
    WaitFor(!EventFlag(19002952));
    WaitFixedTimeSeconds(2);
    Goto(L0);
});

// 重要：重写夜王死亡结算，让夜王死后不触发游戏结算
$Event(190075901, Restart, function(chrEntityId, bgmBossConvParamId, logObjectId) {
    EndIf(EventFlag(7512));
    EndIf(EventFlag(18002800));
    WaitFor(HPRatio(chrEntityId) == 0);
    EndIf(EventFlag(7516));

    if (!EventFlag(19002954)) {
        WaitFixedTimeSeconds(2);
        DisplayBossHealthBar(Disabled, chrEntityId, 0, 0);
        LinkToBossHealthBar(Disabled, logObjectId, 0);
        
        SetNetworkconnectedEventFlagID(19002977, ON);
        
        if(EventFlag(19002976)){
            WaitFor(EventFlag(19002972));
        }

        PlaySE(chrEntityId, SoundType.SFX, 888880000);
        DisplayTextEffectId(1051);
        
        SetNetworkconnectedEventFlagID(19002954, ON);
        WaitFixedTimeSeconds(1);
        
        if (BossBGMPlaying(bgmBossConvParamId)) {
            SetBossBGM(bgmBossConvParamId, BossBGMState.Stop2);
            WaitFixedTimeSeconds(3);
        }
        
        if(EventFlag(19002956) && EventFlag(19002957)){
            SetNetworkconnectedEventFlagID(19002951, ON);
        }
        else {
            // Endless: the chain is always armed - never end the run here
            SetNetworkconnectedEventFlagID(19002951, ON);
            EndEvent();
        }
        

        
        EndEvent();
    }
    
    // Endless: the stock "expedition finished" tail (victory spEffect,
    // kill count, flag 7512) is removed. Once the chain runs, this handler
    // only parks here so it can never end the run.
    WaitFor(!EventFlag(19002954));
});

// ================ 重写普通BOSS的BGM切换：通用 =================
$Event(190075950, Restart, function(bgmBossConvParamId, chrEntityId, spEffectId, targetAmount) {
    DisableNetworkSync();
    EndIf(EventFlag(19002954));
    WaitFor(EventFlag(7511));
    if (Signed(0) != spEffectId) {
        spHp |= CharacterHasSpEffect(chrEntityId, spEffectId, GreaterOrEqual, 1);
    } else {
        spHp |= CharacterRatioHPRatio(chrEntityId, NotEqual, 0) <= targetAmount;
    }
    WaitFor((spHp && BossBGMPlaying(bgmBossConvParamId)) || EventFlag(19002954));
    EndIf(EventFlag(19002954));
    SetBossBGM(bgmBossConvParamId, BossBGMState.HeatUp2);
    WaitFor(!BossBGMPlaying(bgmBossConvParamId) || EventFlag(19002954));
    EndIf(EventFlag(19002954));
    RestartEvent();
});

// ================ 重写连战BOSS的BGM切换：通用 =================
$Event(290075950, Restart, function(bgmBossConvParamId, chrEntityId, spEffectId, targetAmount) {
    DisableNetworkSync();
    EndIf(EventFlag(7512)); 
    WaitFor(EventFlag(19002953)); 
    if (Signed(0) != spEffectId) {
        spHp |= CharacterHasSpEffect(chrEntityId, spEffectId, GreaterOrEqual, 1);
    } else {
        spHp |= CharacterRatioHPRatio(chrEntityId, NotEqual, 0) <= targetAmount;
    }
    WaitFor((spHp && BossBGMPlaying(bgmBossConvParamId)) || EventFlag(7512));
    EndIf(EventFlag(7512));
    SetBossBGM(bgmBossConvParamId, BossBGMState.HeatUp2);
    WaitFor(!BossBGMPlaying(bgmBossConvParamId) || EventFlag(7512));
    EndIf(EventFlag(7512));
    RestartEvent();
});

// ================ 重写连战BOSS的入场动画：格拉迪乌斯 =================
$Event(190075051, Restart, function(chrEntityId, chrEntityId2, entityId, entityId2) {
    if (EventFlag(7512)) {
        ForceCharacterDeath(chrEntityId, false);
        ForceCharacterDeath(chrEntityId2, false);
        EndEvent();
    }
    
    if (EventFlag(19002953)) {
        EnableCharacter(chrEntityId);
        EnableCharacter(chrEntityId2);
        EnableCharacterAI(chrEntityId);
        EnableCharacterAI(chrEntityId2);
        EnableCharacterCollision(chrEntityId);
        EnableCharacterCollision(chrEntityId2);
        DisplayBossHealthBar(Enabled, chrEntityId, 0, 907500000);
        LinkToBossHealthBar(Disabled, 907500000, 0);
        LinkToBossHealthBar(Enabled, 907500000, chrEntityId);
        LinkToBossHealthBar(Enabled, 907500000, chrEntityId2);
        SetBossBGM(750000, BossBGMState.HeatUp);
        EndEvent();
    }
    
    WaitFor(EventFlag(19002955));
    
    EnableCharacter(chrEntityId);
    EnableCharacter(chrEntityId2);
    DisableCharacterAI(chrEntityId);
    DisableCharacterAI(chrEntityId2);
    // WaitFixedTimeFrames(1);  //三狼不用传送
    // WarpCharacterAndCopyFloor(chrEntityId, TargetEntityType.Area, 19002910, -1, 19113910);
    
    ForceAnimationPlayback(chrEntityId, 30028, true, false, false);
    ForceAnimationPlayback(chrEntityId2, 30000, true, false, false);
    
    WaitFor(EventFlag(19002953));
    SetBossBGM(750000, BossBGMState.HeatUp);
    ForceAnimationPlayback(chrEntityId, 20028, false, false, false);
    ForceAnimationPlayback(entityId, 20010, false, false, false);
    ForceAnimationPlayback(entityId2, 20011, false, false, false);

    EnableCharacterAI(chrEntityId);
    EnableCharacterAI(chrEntityId2);
    EnableCharacterCollision(chrEntityId);
    EnableCharacterCollision(chrEntityId2);
    
    LinkToBossHealthBar(Disabled, 907500000, 0);
    LinkToBossHealthBar(Enabled, 907500000, chrEntityId);
    LinkToBossHealthBar(Enabled, 907500000, chrEntityId2);
    
    WaitFor(ElapsedSeconds(3));
    DisplayBossHealthBar(Enabled, chrEntityId, 0, 907500000);
});

// 重写一些连战王三狼的相关参数
$Event(190075008, Restart, function(eventFlagId, eventFlagId2, spEffectId, chrEntityId, spEffectId2, targetAmount) {
    WaitFor(EventFlag(19002955));
    if (!EventFlag(9999)) {
        EndIf(EventFlag(eventFlagId2));
        if (eventFlagId != 0) {
            WaitFor(EventFlag(eventFlagId));
        }
        if (Signed(0) != spEffectId2) {
            WaitFor(CharacterHasSpEffect(chrEntityId, spEffectId2, GreaterOrEqual, 1));
        } else {
            WaitFor(CharacterRatioHPRatio(chrEntityId, NotEqual, 0) <= targetAmount);
        }
    }
    ChangeWeather(Weather.Type10, -1, false);
    SetSpEffect(0, spEffectId);
});

// 重写一些连战王三狼的相关参数
$Event(190075902, Restart, function(chrEntityId, chrEntityId2, chrEntityId3) {
    DisableNetworkSync();
    EndIf(EventFlag(7512));
    WaitFor(EventFlag(19002953));
    if (!PlayerIsInOwnWorld()) {
        if (chrEntityId != 0) {
            SetNetworkUpdateAuthority(chrEntityId, AuthorityLevel.Normal);
        }
        if (chrEntityId2 != 0) {
            SetNetworkUpdateAuthority(chrEntityId2, AuthorityLevel.Normal);
        }
        if (chrEntityId3 != 0) {
            SetNetworkUpdateAuthority(chrEntityId3, AuthorityLevel.Normal);
        }
    }
    WaitFor(PlayerIsInOwnWorld());
    if (PlayerIsInOwnWorld()) {
        if (chrEntityId != 0) {
            SetNetworkUpdateAuthority(chrEntityId, AuthorityLevel.Forced);
        }
        if (chrEntityId2 != 0) {
            SetNetworkUpdateAuthority(chrEntityId2, AuthorityLevel.Forced);
        }
        if (chrEntityId3 != 0) {
            SetNetworkUpdateAuthority(chrEntityId3, AuthorityLevel.Forced);
        }
    }
    WaitFor(!PlayerIsInOwnWorld());
    RestartEvent();
});

// ================ 重写连战BOSS的入场动画：弗格尔 =================
$Event(190075551, Restart, function(chrEntityId) {
    if (EventFlag(7512)) {
        ForceCharacterDeath(chrEntityId, false);
        EndEvent();
    }
    
    if (EventFlag(19002953)) {
        EnableCharacter(chrEntityId);
        EnableCharacterAI(chrEntityId);
        EnableCharacterCollision(chrEntityId);
        DisplayBossHealthBar(Enabled, chrEntityId, 0, 907610000);
        LinkToBossHealthBar(Disabled, 907610000, 0);
        LinkToBossHealthBar(Enabled, 907610000, chrEntityId);
        SetBossBGM(760000, BossBGMState.HeatUp);
        EndEvent();
    }
    
    WaitFor(EventFlag(19002955));

    EnableCharacter(chrEntityId);
    DisableCharacterAI(chrEntityId);
    WaitFixedTimeFrames(1);
    WarpCharacterAndCopyFloor(chrEntityId, TargetEntityType.Area, 19002910, -1, 19113910);
    ForceAnimationPlayback(chrEntityId, 30029, true, false, false);
    
    WaitFor(EventFlag(19002953));
    SetSpEffect(chrEntityId, 5108);
    SetBossBGM(760000, BossBGMState.HeatUp);
    ForceAnimationPlayback(chrEntityId, 20030, false, false, false);
    
    EnableCharacterAI(chrEntityId);
    EnableCharacterCollision(chrEntityId);

    LinkToBossHealthBar(Disabled, 907610000, 0);
    LinkToBossHealthBar(Enabled, 907610000, chrEntityId);
    
    WaitFor(ElapsedSeconds(4));
    DisplayBossHealthBar(Enabled, chrEntityId, 0, 907610000);
});

// ================ 重写连战BOSS的入场动画：卡莉果 =================
$Event(191175651, Restart, function(chrEntityId) {
    if (EventFlag(7512)) {
        ForceCharacterDeath(chrEntityId, false);
        EndEvent();
    }
    
    if (EventFlag(19002953)) {
        EnableCharacter(chrEntityId);
        EnableCharacterAI(chrEntityId);
        EnableCharacterCollision(chrEntityId);
        EnableLockOnPoint(chrEntityId, 221);
        EnableLockOnPoint(chrEntityId, 222);
        EnableLockOnPoint(chrEntityId, 223);
        EnableLockOnPoint(chrEntityId, 224);
        DisplayBossHealthBar(Enabled, chrEntityId, 0, 907620000);
        LinkToBossHealthBar(Disabled, 907620000, 0);
        LinkToBossHealthBar(Enabled, 907620000, chrEntityId);
        if (CharacterHasSpEffect(chrEntityId, 5106)) {
            SetBossBGM(490000, BossBGMState.HeatUp2);
            EndEvent();
        }
        if (CharacterHasSpEffect(chrEntityId, 5105)) {
            SetBossBGM(490000, BossBGMState.HeatUp);
            EndEvent();
        }
        EndEvent();
    }
    
    WaitFor(EventFlag(19002955));
    
    EnableCharacter(chrEntityId);
    DisableCharacterAI(chrEntityId);
    DisableLockOnPoint(chrEntityId, 221);
    DisableLockOnPoint(chrEntityId, 222);
    DisableLockOnPoint(chrEntityId, 223);
    DisableLockOnPoint(chrEntityId, 224);
    WaitFixedTimeFrames(1);
    WarpCharacterAndCopyFloor(chrEntityId, TargetEntityType.Area, 19002910, -1, 19113910);
    ForceAnimationPlayback(chrEntityId, 30029, true, false, false);
    
    WaitFor(EventFlag(19002953));
    EnableCharacterAI(chrEntityId);
    ActivateGparamOverride(4, 0);
    
    ForceAnimationPlayback(chrEntityId, 20029, false, false, false);
    EnableLockOnPoint(chrEntityId, 221);
    EnableLockOnPoint(chrEntityId, 222);
    EnableLockOnPoint(chrEntityId, 223);
    EnableLockOnPoint(chrEntityId, 224);
    DeactivateGparamOverride(3);
    
    EnableCharacterCollision(chrEntityId);
    
    if (CharacterHasSpEffect(chrEntityId, 5106)) {
        SetBossBGM(490000, BossBGMState.HeatUp2);
    } else if (CharacterHasSpEffect(chrEntityId, 5105)) {
        SetBossBGM(490000, BossBGMState.HeatUp);
    } else {
        SetBossBGM(490000, BossBGMState.Start);
    }
    
    LinkToBossHealthBar(Disabled, 907620000, 0);
    LinkToBossHealthBar(Enabled, 907620000, chrEntityId);
    
    WaitFor(ElapsedSeconds(2.5));
    DisplayBossHealthBar(Enabled, chrEntityId, 0, 907620000);
});

// 重写一些连战王冰龙的相关参数
$Event(191175652, Restart, function(chrEntityId, spEffectId, spEffectId2) {
    DisableNetworkSync();
    EndIf(EventFlag(7512));
    EndIf(CharacterHasSpEffect(chrEntityId, spEffectId2));
    WaitFor(EventFlag(19002973));
    WaitFor(
        CharacterHasSpEffect(chrEntityId, spEffectId)
            || CharacterHasSpEffect(chrEntityId, spEffectId2)
            || EventFlag(7512));
    EndIf(CharacterHasSpEffect(chrEntityId, spEffectId2));
    EndIf(EventFlag(7512));
    SetBossBGM(490000, BossBGMState.HeatUp);
    WaitFor(
        !BossBGMPlaying(490000) || CharacterHasSpEffect(chrEntityId, spEffectId2) || EventFlag(7512));
    EndIf(CharacterHasSpEffect(chrEntityId, spEffectId2));
    EndIf(EventFlag(7512));
    RestartEvent();
});

// =================== 重写Boss状态管理：史柴格斯 =================
$Event(190075752, Restart, function(chrEntityId, eventFlagId) {
    if (EventFlag(7512)) {
        ForceCharacterDeath(chrEntityId, false);
        EndEvent();
    }
    if (EventFlag(19002953)) {
        EnableCharacter(chrEntityId);
        EnableCharacterAI(chrEntityId);
        EnableCharacterCollision(chrEntityId);
        if (!EventFlag(eventFlagId)) {
            EnableCharacterImmortality(chrEntityId);
        }
        if (EventFlag(eventFlagId)) {
            DisplayBossHealthBar(Enabled, chrEntityId, 0, 907630001);
            LinkToBossHealthBar(Disabled, 907630001, 0);
            LinkToBossHealthBar(Enabled, 907630001, chrEntityId);
            EndEvent();
        }
        DisplayBossHealthBar(Enabled, chrEntityId, 0, 907630000);
        LinkToBossHealthBar(Disabled, 907630000, 0);
        LinkToBossHealthBar(Enabled, 907630000, chrEntityId);
        EndEvent();
    }
    
    WaitFor(EventFlag(19002953));
    ForceAnimationPlayback(chrEntityId, 20029, false, false, false);
    EnableCharacterAI(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    LinkToBossHealthBar(Disabled, 907630000, 0);
    LinkToBossHealthBar(Enabled, 907630000, chrEntityId);
    WaitFor(ElapsedSeconds(4));
    DisplayBossHealthBar(Enabled, chrEntityId, 0, 907630000);
});

// ================ 重写二阶段过渡：史柴格斯 =================
$Event(190075770, Restart, function(chrEntityId, entityId, eventFlagId) {
    EndIf(EventFlag(eventFlagId));
    EndIf(EventFlag(7512));
    WaitFor(CharacterHasSpEffect(chrEntityId, 60507) || CharacterHasSpEffect(chrEntityId, 60505));
    DisplayBossHealthBar(Disabled, chrEntityId, 0, 907630000);
    WaitFor(CharacterHasSpEffect(chrEntityId, 60505));
    SetSpEffect(10000, 60506);
    WaitFor(ElapsedSeconds(5));
    FadeToBlack(1, 0.5, true, 0);
    WaitFor(ElapsedSeconds(0.5));
    WarpCharacterAndCopyFloorUnknown200489(chrEntityId, TargetEntityType.Area, entityId, -1, chrEntityId, -1, -1);
    if (IsPlayerNo(1)) {
        WarpCharacterAndCopyFloorUnknown200489(10002, TargetEntityType.Area, 19002920, -1, 10002, -1, -1);
    }
    if (IsPlayerNo(2)) {
        WarpCharacterAndCopyFloorUnknown200489(10003, TargetEntityType.Area, 19002921, -1, 10003, -1, -1);
    }
    if (IsPlayerNo(3)) {
        WarpCharacterAndCopyFloorUnknown200489(10004, TargetEntityType.Area, 19002922, -1, 10004, -1, -1);
    }
    if (IsPlayerNo(4)) {
        WarpCharacterAndCopyFloorUnknown200489(10005, TargetEntityType.Area, 19002923, -1, 10005, -1, -1);
    }
    if (IsPlayerNo(5)) {
        WarpCharacterAndCopyFloorUnknown200489(10006, TargetEntityType.Area, 19002924, -1, 10006, -1, -1);
    }
    if (IsPlayerNo(6)) {
        WarpCharacterAndCopyFloorUnknown200489(10007, TargetEntityType.Area, 19002925, -1, 10007, -1, -1);
    }
    SetCameraAngle(0, 0);
    WaitFor(ElapsedSeconds(4));
    FadeToBlack(0, 0.5, false, -1);
    WaitFor(ElapsedSeconds(1));
    SetSpEffect(chrEntityId, 60510);
    DisableCharacterImmortality(chrEntityId);
    LinkToBossHealthBar(Disabled, 907630001, 0);
    LinkToBossHealthBar(Enabled, 907630001, chrEntityId);
    SetNetworkconnectedEventFlagID(eventFlagId, ON);
    WaitFor(!CharacterHasSpEffect(chrEntityId, 60507));
    DisplayBossHealthBar(Enabled, chrEntityId, 0, 907630001);
});

// ================ 重写死亡结算：史柴格斯 =================
$Event(190075904, Restart, function(chrEntityId, bgmBossConvParamId, logObjectId, timeSeconds, spEffectId, timeSeconds2) {

    EndIf(EventFlag(7512));
    EndIf(EventFlag(18002800));
    WaitFor(HPRatio(chrEntityId) == 0);
    EndIf(EventFlag(7516));
    
    SetSpEffect(10000, 509);
    SetSpEffect(10001, 509);
    SetSpEffect(10002, 509);
    SetSpEffect(10003, 509);
    SetSpEffect(10004, 509);
    SetSpEffect(10005, 509);
    SetSpEffect(10006, 509);
    SetSpEffect(10007, 509);
    SetSpEffect(10008, 509);
    SetSpEffect(10009, 509);
    SetSpEffect(10010, 509);
    
    EnableCharacterImmortality(20000);
    SetNetworkconnectedEventFlagID(19002953, ON);
    WaitFixedTimeSeconds(5);
    
    if (Signed(spEffectId) != 0) {
        if (CharacterHasSpEffect(chrEntityId, spEffectId)) {
            WaitFixedTimeSeconds(timeSeconds2);
        } else {
            WaitFixedTimeSeconds(timeSeconds);
        }
    } else {
        WaitFixedTimeSeconds(timeSeconds);
    }
    
    PlaySE(chrEntityId, SoundType.SFX, 888880000);
    
    RecordUserDispLog(10111, 10000, LogObjectType.NpcName, logObjectId);

    if (PlayerInMap(16, 0, 0, 0)) {
        DisplayTextEffectId(1052);
    }
    if (PlayerInMap(16, 10, 0, 0)) {
        DisplayTextEffectId(1053);
    }
    if (PlayerInMap(18, 0, 0, 0)) {
        DisplayTextEffectId(1040);
    }
    if (PlayerInMap(19, 0, 0, 0)) {
        DisplayTextEffectId(1051);
    }
    
    if (BossBGMPlaying(bgmBossConvParamId)) {
        SetBossBGM(bgmBossConvParamId, BossBGMState.Stop2);
    }
    
    IncrementTeamBossesKilled(1);
    DisplayBossHealthBar(Disabled, chrEntityId, 0, 0);
    
    // Endless: 7512 (expedition finished) is never set
    WaitFixedTimeSeconds(0.1);
    
    SetSpEffect(20000, 102121);
});

// ==================== 重写BGM切换:史柴格斯 =================
$Event(190075780, Restart, function(chrEntityId, eventFlagId) {
    DisableNetworkSync();
    EndIf(EventFlag(7512));
    if (EventFlag(eventFlagId)) {
        SetBossBGM(761000, BossBGMState.HeatUp2);
    } else {
        if (CharacterHasSpEffect(chrEntityId, 5105)) {
            SetBossBGM(761000, BossBGMState.HeatUp);
        } else {
            WaitFor(EventFlag(19002953));
            SetBossBGM(761000, BossBGMState.Start);
            WaitFor(ElapsedFrames(1));
            WaitFor(CharacterHasSpEffect(chrEntityId, 5105) || !BossBGMPlaying(761000));
            RestartIf(!BossBGMPlaying(761000));
            SetBossBGM(761000, BossBGMState.HeatUp);
            WaitFor(ElapsedFrames(1));
        }
L0:
        WaitFor(EventFlag(eventFlagId) || !BossBGMPlaying(761000));
        RestartIf(!BossBGMPlaying(761000));
        SetBossBGM(761000, BossBGMState.HeatUp2);
        WaitFor(ElapsedFrames(1));
    }
L1:
    WaitFor(!BossBGMPlaying(761000));
    WaitFor(ElapsedSeconds(5));
    RestartEvent();
});

// ==================== 重写玩家效果：史柴格斯 =================
$Event(190075773, Restart, function(chrEntityId, eventFlagId) {
    DisableNetworkSync();
    EndIf(EventFlag(7512));
    EndIf(EventFlag(19002953) && !CharacterHasSpEffect(20000, 6999200));
    if ((CharacterHasSpEffect(chrEntityId, 60521) || EventFlag(eventFlagId))
        && CharacterHasSpEffect(20000, 6999201)) {
        SetSpEffect(20000, 6999201);
        EndEvent();
    }
    WaitFor(EventFlag(19002953));
    EndIf(!CharacterHasSpEffect(20000, 6999200));
    WaitFor(CharacterHasSpEffect(chrEntityId, 60521) || EventFlag(eventFlagId));
    WaitFor(CharacterHasSpEffect(chrEntityId, 60521) || ElapsedSeconds(25));
    SetSpEffect(20000, 6999201);
    SetSpEffect(20000, 60522);
    WaitFor(ElapsedSeconds(2.2));
    RecordUserDispLog(110400, 20000, LogObjectType.None, -1);
});

// ==================== 重写区域效果：史柴格斯 =================
$Event(190075774, Restart, function(chrEntityId, areaEntityId) {
    EndIf(EventFlag(7512));
    WaitFor(EventFlag(19002953));
    WaitFor(!InArea(chrEntityId, areaEntityId) || CharacterHasSpEffect(chrEntityId, 60555));
    SetSpEffect(chrEntityId, 60555);
    DisableNetworkSync();
    WaitFor(CharacterHasSpEffect(chrEntityId, 60555));
    EnableNetworkSync();
    WaitFor(InArea(chrEntityId, areaEntityId) || !CharacterHasSpEffect(chrEntityId, 60555));
    SetSpEffect(chrEntityId, 60556);
    DisableNetworkSync();
    WaitFor(!CharacterHasSpEffect(chrEntityId, 60555));
    EnableNetworkSync();
    RestartEvent();
});

// ================== 重写BOSS入场动画:布德奇冥 ==================
$Event(190075851, Restart, function(chrEntityId, nameId) {
    if (EventFlag(7512)) {
        ForceCharacterDeath(chrEntityId, false);
        EndEvent();
    }
    if (EventFlag(19002953)) {
        EnableCharacter(chrEntityId);
        EnableCharacterAI(chrEntityId);
        DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
        LinkToBossHealthBar(Disabled, nameId, 0);
        LinkToBossHealthBar(Enabled, nameId, chrEntityId);
        SetBossBGM(100520, BossBGMState.Start);
        EndEvent();
    }
    WaitFor(EventFlag(19002953));
    
    WaitFor(CharacterHasSpEffect(chrEntityId, 46726));
    DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
    LinkToBossHealthBar(Disabled, nameId, 0);
    LinkToBossHealthBar(Enabled, nameId, chrEntityId);
    SetBossBGM(100520, BossBGMState.Start);
    EnableCharacterCollision(chrEntityId);
    DisplayTextEffectId(6014);
    
    WaitFor(CharacterHasSpEffect(chrEntityId, 46734));
    DisplayTextEffectId(6011);
    SetBossBGM(100800, BossBGMState.HeatUp);
    ChangeAssetEnableState(19006852, Enabled);
    ChangeAssetEnableState(19006851, Enabled);
    WaitFor(CharacterHasSpEffect(chrEntityId, 46731));
    SpawnOneshotSFX(TargetEntityType.Character, chrEntityId, 960, 203);
    WaitFixedTimeSeconds(4);
    SetBossBGM(100520, BossBGMState.Stop1);
    WaitFor(EventFlag(7512));
    RestartEvent();
});

// ================== 重写BOSS死亡检测:布德奇冥==================
$Event(190017580, Default, function(chrEntityId) {
    EndIf(EventFlag(7512));
    WaitFor(EventFlag(19002953));

    if (!EventFlag(19002952)) {
        EndEvent();
    }
    
    WaitFor(HPRatio(chrEntityId) <= 0);
    
    WaitFixedTimeSeconds(3);
    DisplayBossHealthBar(Disabled, chrEntityId, 0, 0);

    // Endless: 7512 (expedition finished) is never set
    WaitFixedTimeSeconds(24);
    DisableCharacter(chrEntityId);
    DisableCharacterAI(chrEntityId);
    
    EndEvent();
});

// ================== 重写BOSS战斗区域触发：约定之王拉塔恩 ==================
$Event(190075900, Default, function(chrEntityId) {
    EndIf(EventFlag(7512));
    EndIf(EventFlag(18002800));
    WaitFor(EventFlag(19002953));
    SetWorldMapPointFlag(0, ON);
    SetWorldMapPointFlag(8, OFF);
    EndIf(CharacterRatioDead(chrEntityId));
    WaitFor(EventFlag(7512));
    SetWorldMapPointFlag(0, OFF);
    SetWorldMapPointFlag(8, ON);
});

// ================== 重写BOSS入场动画：约定之王拉塔恩 ==================
$Event(190075501, Restart, function(chrEntityId, nameId) {
    if (EventFlag(7512)) {
        ForceCharacterDeath(chrEntityId, false);
        EndEvent();
    }
    if (EventFlag(19002953)) {
        EnableCharacter(chrEntityId);
        EnableCharacterAI(chrEntityId);
        DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
        LinkToBossHealthBar(Disabled, nameId, 0);
        LinkToBossHealthBar(Enabled, nameId, chrEntityId);
        SetBossBGM(760000, BossBGMState.Start);
        EndEvent();
    }
    WaitFor(EventFlag(19002955));
    EnableCharacter(chrEntityId);
    WaitFixedTimeFrames(1);
    // WarpCharacterAndCopyFloor(chrEntityId, TargetEntityType.Area, 19002910, -1, 19113910);
    
    WaitFor(EventFlag(19002953));
    SetBossBGM(760000, BossBGMState.Start);
    ForceAnimationPlayback(chrEntityId, 20029, false, false, false);
    EnableCharacterAI(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    LinkToBossHealthBar(Disabled, 907610001, 0);
    LinkToBossHealthBar(Enabled, 907610001, chrEntityId);
    WaitFor(ElapsedSeconds(4));
    DisplayBossHealthBar(Enabled, chrEntityId, 0, 907610001);
});

// ================== 双BOSS战激活相关注册函数 ==================
$Event(19212818, Default, function(chrEntityId, nameId, animId) {
    EndIf(EventFlag(7512));
    DisableCharacter(chrEntityId);
    DisableCharacterCollision(chrEntityId);
    DisableCharacterAI(chrEntityId);
    
    WaitFor(EventFlag(19002973));
    SetNetworkconnectedEventFlagID(19002971, ON);
    DisplayTextEffectId(6016);
    if (!EventFlag(7511)) {
        WaitFor(EventFlag(7511));
    }
    
    WaitFor(EventFlag(19002975));
    WaitFixedTimeSeconds(0.5);
    if (EventFlag(19002954)) {
        EndEvent();
    }
    
    EnableCharacter(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    WaitFixedTimeFrames(1);
    WarpCharacterAndCopyFloor(chrEntityId, TargetEntityType.Area, 19002910, -1, 19113910);
    ForceAnimationPlayback(chrEntityId, animId, false, false, false);
    WaitFixedTimeSeconds(1);
    EnableCharacterAI(chrEntityId);
    
    SetNetworkUpdateRate(chrEntityId, true, CharacterUpdateFrequency.AlwaysUpdate);

    LinkToBossHealthBar(Disabled, nameId, 0);
    LinkToBossHealthBar(Enabled, nameId, chrEntityId);
    WaitFor(ElapsedSeconds(2));
    DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
    SetNetworkconnectedEventFlagID(19002976, ON);
    
    WaitFixedTimeSeconds(1.5);
    SetNetworkconnectedEventFlagID(19002974, ON);
    
    WaitFor(CharacterHPValue(chrEntityId) <= 0);
    
    PlaySE(chrEntityId, SoundType.SFX, 888880000);
    WaitFixedTimeSeconds(7);
    SetNetworkconnectedEventFlagID(19002972, ON);

    DisplayBossHealthBar(Disabled, chrEntityId, 0, nameId);
    WaitFor(ElapsedSeconds(5));
    LinkToBossHealthBar(Disabled, nameId, 0); 
    
    DisableCharacterAI(chrEntityId);
    DisableCharacterCollision(chrEntityId);
    DisableCharacter(chrEntityId);
    
    EndEvent();
});

// ================== 双BOSS战BUFF注册函数 ==================
$Event(19212819, Default, function(chrEntityId) {
    EndIf(EventFlag(19002954)); 
    WaitFor(EventFlag(19002976));
    SetSpEffect(chrEntityId, 96312);
    WaitFor(EventFlag(19002977));
    ClearSpEffect(chrEntityId, 96312);
    EndEvent();
});

// ================== 双BOSS战动画注册函数 ==================
$Event(19212820, Default, function(chrEntityId, animId) {
    EndIf(EventFlag(19002954)); 
    WaitFor(EventFlag(19002974));
    ForceAnimationPlayback(chrEntityId, animId, false, false, false);
    EndEvent();
});

// ================== 双BOSS战粪金龟开关注册函数 ==================
$Event(19219920, Restart, function(enemyID) {
    EndIf(EventFlag(19002954));
    EndIf(EventFlag(19002973));
    if (!EntityInRadiusOfEntity(20000, enemyID, 30, 1)) {
        DisableCharacterGravity(enemyID);
        DisableCharacterAI(enemyID);
        WaitFixedTimeSeconds(0.2);
        WaitFor(EntityInRadiusOfEntity(20000, enemyID, 30, 1));
    } else {
        WaitFixedTimeSeconds(0.2);
        EnableCharacterGravity(enemyID);
        EnableCharacterAI(enemyID);
        WaitFor(HPRatio(enemyID) <= 0);
        WaitFixedTimeSeconds(1);
        SetNetworkconnectedEventFlagID(19002973, ON);
    }
    RestartEvent();
});

// 重写山羊BGM相关函数1
$Event(190075452, Restart, function(chrEntityId, chrEntityId2, eventFlagId, eventFlagId2, eventFlagId3) {
    if (EventFlag(7512)) {
        DisableCharacter(chrEntityId2);
        DisableCharacterAI(chrEntityId2);
        EndEvent();
    }
    if (EventFlag(19002954)) {
        DisableCharacter(chrEntityId2);
        DisableCharacterAI(chrEntityId2);
        EndEvent();
    }
    if (EventFlag(7511)) {
        EnableCharacter(chrEntityId2);
        EnableCharacterAI(chrEntityId2);
        SetNetworkUpdateRate(chrEntityId2, true, CharacterUpdateFrequency.AlwaysUpdate);
        SetBossBGM(756000, BossBGMState.HeatUp);
        DisplayBossHealthBar(Enabled, chrEntityId2, 0, 907550000);
        LinkToBossHealthBar(Disabled, 907550000, 0);
        LinkToBossHealthBar(Enabled, 907550000, chrEntityId2);
        EndEvent();
    }
    DisableCharacter(chrEntityId2);
    DisableCharacterAI(chrEntityId2);
    WaitFor(EventFlag(eventFlagId));
    if (EventFlag(eventFlagId2)) {
        WaitFixedTimeSeconds(7);
        ForceAnimationPlayback(chrEntityId2, 20010, false, false, false);
    }
    if (EventFlag(eventFlagId3)) {
        WaitFixedTimeSeconds(3.17);
        ForceAnimationPlayback(chrEntityId2, 20011, false, false, false);
    }
    EnableCharacter(chrEntityId2);
    EnableCharacterAI(chrEntityId2);
    SetNetworkUpdateRate(chrEntityId2, true, CharacterUpdateFrequency.AlwaysUpdate);
    DisplayBossHealthBar(Enabled, chrEntityId2, 0, 907550000);
    LinkToBossHealthBar(Disabled, 907550000, 0);
    LinkToBossHealthBar(Enabled, 907550000, chrEntityId2);
    PlaySE(chrEntityId2, SoundType.BGM, 756000000);
    SetNetworkconnectedEventFlagID(7511, ON);
    WaitFor(CharacterHasSpEffect(chrEntityId, 46215));
    SetBossBGM(756000, BossBGMState.HeatUp);
});

// 重写山羊BGM相关函数2
$Event(199075486, Restart, function(chrEntityId) {
    DisableNetworkSync();
    EndIf(EventFlag(7512));
    EndIf(EventFlag(19002954));
    WaitFor(EventFlag(7511));
    WaitFor(ElapsedSeconds(5));
    WaitFor(!BossBGMPlaying(756000));
    WaitFor(ElapsedSeconds(1));
    EndIf(EventFlag(19002954));
    EndIf(EventFlag(7512));
    if (CharacterHasSpEffect(chrEntityId, 5106)) {
        SetBossBGM(756000, BossBGMState.HeatUp2);
        RestartEvent();
    }
    SetBossBGM(756000, BossBGMState.HeatUp);
    RestartEvent();
});

// 重写山羊BGM相关函数3
$Event(190075405, Restart, function(eventFlagId, eventFlagId2, eventFlagId3, eventFlagId4, eventFlagId5) {
    EndIf(EventFlag(7512));
    EndIf(EventFlag(19002954));
    EndIf(EventFlag(7511));
    EndIf(EventFlag(eventFlagId));
    WaitFor(EventFlag(19002973));
    WaitFor(
        ((!(CharacterHasTeamType(10002, TeamType.Human)
            || CharacterHasTeamType(10002, TeamType.WhitePhantom))
            || EventFlag(eventFlagId3))
            && (!(CharacterHasTeamType(10003, TeamType.Human)
                || CharacterHasTeamType(10003, TeamType.WhitePhantom))
                || EventFlag(eventFlagId4))
            && (!(CharacterHasTeamType(10004, TeamType.Human)
                || CharacterHasTeamType(10004, TeamType.WhitePhantom))
                || EventFlag(eventFlagId5)))
            || EventFlag(eventFlagId));
    EndIf(EventFlag(eventFlagId));
    SetNetworkconnectedEventFlagID(eventFlagId, ON);
    SetNetworkconnectedEventFlagID(eventFlagId2, ON);
});

// 重写冰龙BGM相关函数1
$Event(190075610, Restart, function(chrEntityId) {
    EndIf(EventFlag(19002954));
    WaitFor(EventFlag(7511));
    WaitFor(
        CharacterHasSpEffect(chrEntityId, 47040)
            || CharacterHasSpEffect(chrEntityId, 47041)
            || CharacterHasSpEffect(chrEntityId, 47042));
    UnknownSound201013(1);
    WaitFor(
        !CharacterHasSpEffect(chrEntityId, 47040)
            && !CharacterHasSpEffect(chrEntityId, 47041)
            && !CharacterHasSpEffect(chrEntityId, 47042));
    UnknownSound201013(0);
    RestartEvent();
});

// 重写冰龙BGM相关函数2
$Event(190075651, Restart, function(chrEntityId) {
    if (EventFlag(19002954)) {
        ForceCharacterDeath(chrEntityId, false);
        EndEvent();
    }
    if (EventFlag(7511)) {
        EnableCharacter(chrEntityId);
        EnableCharacterAI(chrEntityId);
        DisplayBossHealthBar(Enabled, chrEntityId, 0, 907620000);
        LinkToBossHealthBar(Disabled, 907620000, 0);
        LinkToBossHealthBar(Enabled, 907620000, chrEntityId);
        if (CharacterHasSpEffect(chrEntityId, 5106)) {
            SetBossBGM(490000, BossBGMState.HeatUp2);
        } else if (CharacterHasSpEffect(chrEntityId, 5105)) {
            SetBossBGM(490000, BossBGMState.HeatUp);
        } else {
            SetBossBGM(490000, BossBGMState.Start);
        }
        EndEvent();
    }
    EnableCharacter(chrEntityId);
    DisableCharacterAI(chrEntityId);
    DisableLockOnPoint(chrEntityId, 221);
    DisableLockOnPoint(chrEntityId, 222);
    DisableLockOnPoint(chrEntityId, 223);
    DisableLockOnPoint(chrEntityId, 224);
    WaitFor(EventFlag(7510) || EventFlag(7511) || PlayerInMap(19, 0, 0, 0));
    ForceAnimationPlayback(chrEntityId, 30029, true, false, false);
    EnableCharacterAI(chrEntityId);
    ActivateGparamOverride(4, 0);
    WaitFor(EventFlag(7511));
    ForceAnimationPlayback(chrEntityId, 20029, false, false, false);
    EnableLockOnPoint(chrEntityId, 221);
    EnableLockOnPoint(chrEntityId, 222);
    EnableLockOnPoint(chrEntityId, 223);
    EnableLockOnPoint(chrEntityId, 224);
    DeactivateGparamOverride(3);
    if (CharacterHasSpEffect(chrEntityId, 5106)) {
        SetBossBGM(490000, BossBGMState.HeatUp2);
    } else if (CharacterHasSpEffect(chrEntityId, 5105)) {
        SetBossBGM(490000, BossBGMState.HeatUp);
    } else {
        SetBossBGM(490000, BossBGMState.Start);
    }
    LinkToBossHealthBar(Disabled, 907620000, 0);
    LinkToBossHealthBar(Enabled, 907620000, chrEntityId);
    WaitFor(ElapsedSeconds(2.5));
    DisplayBossHealthBar(Enabled, chrEntityId, 0, 907620000);
});

// 重写冰龙BGM相关函数3
$Event(190075652, Restart, function(chrEntityId, spEffectId, spEffectId2) {
    DisableNetworkSync();
    EndIf(EventFlag(19002954));
    EndIf(CharacterHasSpEffect(chrEntityId, spEffectId2));
    WaitFor(EventFlag(7511));
    WaitFor(
        CharacterHasSpEffect(chrEntityId, spEffectId)
            || CharacterHasSpEffect(chrEntityId, spEffectId2)
            || EventFlag(19002954));
    EndIf(CharacterHasSpEffect(chrEntityId, spEffectId2));
    EndIf(EventFlag(19002954));
    SetBossBGM(490000, BossBGMState.HeatUp);
    WaitFor(
        !BossBGMPlaying(490000) || CharacterHasSpEffect(chrEntityId, spEffectId2) || EventFlag(19002954));
    EndIf(CharacterHasSpEffect(chrEntityId, spEffectId2));
    EndIf(EventFlag(19002954));
    RestartEvent();
});


$Event(19309000, Restart, function(chrEntityId, bgmBossConvParamId, logObjectId, selectionFlagId) {
    // ===== ENDLESS GAUNTLET: chained Nightlord death handler =====
    // Same defeat feedback as common_func 90075901, but it never sets flag 7512
    // (expedition finished). Instead it counts the kill, optionally replenishes
    // consumables, and lets the round manager start the next round.
    // Explicit loop: one pass of this body is one kill.
L0:
    if (EventFlag(7512)) {
        WaitFor(EventFlag(19300999));   // expedition finished - stop counting
    }

    // only the family that was rolled this round is hunted
    WaitFor(EventFlag(19002953) && EventFlag(selectionFlagId));
    WaitFor(HPRatio(chrEntityId) <= 0);

    SetNetworkconnectedEventFlagID(19002953, OFF);
    SetNetworkconnectedEventFlagID(19002955, OFF);
    SetNetworkconnectedEventFlagID(19002952, OFF);

    DisplayBossHealthBar(Disabled, chrEntityId, 0, 0);
    LinkToBossHealthBar(Disabled, logObjectId, 0);

    SetSpEffect(10000, 509);
    SetSpEffect(10001, 509);
    SetSpEffect(10002, 509);
    SetSpEffect(10003, 509);
    SetSpEffect(10004, 509);
    SetSpEffect(10005, 509);
    SetSpEffect(10006, 509);
    SetSpEffect(10007, 509);
    SetSpEffect(10008, 509);
    SetSpEffect(10009, 509);
    SetSpEffect(10010, 509);

    if (BossBGMPlaying(bgmBossConvParamId)) {
        SetBossBGM(bgmBossConvParamId, BossBGMState.Stop2);
    }

    IncrementTeamBossesKilled(1);
    PlaySE(chrEntityId, SoundType.SFX, 888880000);
    RecordUserDispLog(10111, 10000, LogObjectType.NpcName, logObjectId);

    if (PlayerInMap(16, 0, 0, 0)) {
        DisplayTextEffectId(1052);
    }
    if (PlayerInMap(16, 10, 0, 0)) {
        DisplayTextEffectId(1053);
    }
    if (PlayerInMap(18, 0, 0, 0)) {
        DisplayTextEffectId(1040);
    }
    if (PlayerInMap(19, 0, 0, 0)) {
        DisplayTextEffectId(1051);
    }

    WaitFixedTimeSeconds(2);

    if (EventFlag(19300101)) {
        if (EventFlag(19300102)) {
            // 3 bosses defeated: replenish consumables
            SetSpEffect(10000, 509);
            SetSpEffect(10001, 509);
            SetSpEffect(10002, 509);
            SetSpEffect(10003, 509);
            SetSpEffect(10004, 509);
            SetSpEffect(10005, 509);
            SetSpEffect(10006, 509);
            SetSpEffect(10007, 509);
            SetSpEffect(10008, 509);
            SetSpEffect(10009, 509);
            SetSpEffect(10010, 509);
            SetNetworkconnectedEventFlagID(19300101, OFF);
            SetNetworkconnectedEventFlagID(19300102, OFF);
        } else {
            SetNetworkconnectedEventFlagID(19300102, ON);
        }
    } else {
        SetNetworkconnectedEventFlagID(19300101, ON);
    }

    // leave a clean corpse so the next round spawns the boss at full health
    DisableCharacterAI(chrEntityId);
    DisableCharacterCollision(chrEntityId);
    DisableCharacter(chrEntityId);

    WaitFixedTimeSeconds(1);
    Goto(L0);
});
