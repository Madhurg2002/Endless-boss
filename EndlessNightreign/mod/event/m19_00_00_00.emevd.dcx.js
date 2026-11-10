// ==EMEVD==
// @docs    nr-common.emedf.json
// @compress    DCX_DFLT_10000_44_9
// @game    Sekiro
// @string    "W:\\CL\\data\\Param\\event\\common_func.emevd\u0000W:\\CL\\data\\Param\\event\\common_macro.emevd\u0000\u0000\u0000\u0000\u0000\u0000"
// @linked    [0,82]
// @version    3.6.2
// ==/EMEVD==

$Event(0, Default, function() {
    $InitializeEvent(0, 19002590);
    if (IsMapVariation(0)) {
        //----连战系统相关，这里是三狼连战系统相关事件，其他的夜王也是类似的处理方式
        
        InitializeCommonEvent(0, 90075900, 19000800);
        // 重写夜王死亡结算，让夜王死后不触发游戏结算
        InitializeEvent(0, 190075901, 19000800, 750000, 907500000);
        InitializeCommonEvent(0, 90075902, 19000800, 19005801, 0);
        InitializeCommonEvent(0, 90015012, 19000800, 7511);
        InitializeCommonEvent(1, 90015012, 19005801, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 90075000, 19000800, 19005801);
        InitializeCommonEvent(0, 90075001, 19000800, 19005801);
        InitializeCommonEvent(0, 90075002, 19000800, 19000801, 19000802);
        InitializeCommonEvent(0, 90075005, 19000800, 19000801, 72, 5900);
        InitializeCommonEvent(0, 90075005, 19000800, 19000802, 2, 5901);
        InitializeCommonEvent(0, 90075006, 19000800, 19000801);
        InitializeCommonEvent(0, 90075006, 19000800, 19000802);
        InitializeCommonEvent(0, 90015008, 7511, 7512, 750000, 19000800, 5105, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006800, 19000800, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006801, 19000800, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006802, 19000800, 5108, 0);
        InitializeCommonEvent(0, 90075008, 7511, 7512, 0, 19000800, 5108, 0);
        InitializeCommonEvent(0, 90065920, 19000800, 7320);
        InitializeCommonEvent(0, 90065920, 19005801, 7320);
        
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19000800); // 注册双夜王事件
        // 重写游戏结束事件（连战重要实现：劫持结算事件，在击败夜王前插入连战夜王相关事件）
        $InitializeEvent(0, 19002951);  
    }
    if (IsMapVariation(1)) {
        InitializeCommonEvent(0, 90075100, 19000810);
        InitializeCommonEvent(0, 90075101, 19000810);
        InitializeCommonEvent(0, 90075102, 19000810);
        InitializeCommonEvent(0, 90075900, 19000810);
        InitializeEvent(0, 190075901, 19000810, 751000, 907510000);
        InitializeCommonEvent(0, 90075902, 19000810, 0, 0);
        InitializeCommonEvent(0, 90015012, 19000810, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 90015008, 7511, 7512, 751000, 19000810, 5105, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006810, 19000810, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006811, 19000810, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006812, 19000810, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006813, 19000810, 5108, 0);
        InitializeCommonEvent(0, 90075150, 7511, 7512, 0, 19000810, 5108, 0);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19000810);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(2)) {
        InitializeCommonEvent(0, 90075900, 19005821);
        InitializeEvent(0, 190075901, 19000827, 752000, 907520000);
        InitializeCommonEvent(0, 90075902, 19005821, 0, 0);
        InitializeCommonEvent(0, 90015012, 19005821, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 90075200, 19005821, 19000827);
        InitializeCommonEvent(0, 90075201, 19005821, 19000821, 19000820, 19000825, 19000826, 19000827, 19000220, 19000221, 19000222);
        InitializeCommonEvent(0, 90075202, 19000827, 19000821, 19000820, 19000825, 19000826, 19000222);
        InitializeCommonEvent(0, 99075205, 19000821, 19000820);
        InitializeCommonEvent(0, 90075220, 19000825, 19000222);
        InitializeCommonEvent(0, 90075210, 19000827, 19000820, 19000220);
        InitializeCommonEvent(0, 90075211, 19000821, 19000820, 19000221);
        InitializeCommonEvent(0, 90075212, 19000821, 19000825, 19000826, 19000220, 19000221, 19000222, 0);
        if (IsPlayerNo(1)) {
            InitializeCommonEvent(0, 90075230, 19000822, 10002, 1);
            InitializeCommonEvent(0, 90075230, 19000823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19000824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19000832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19000833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19000834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19000822);
            InitializeCommonEvent(0, 90075232, 19000822);
            InitializeCommonEvent(0, 90075233, 19000822);
            InitializeCommonEvent(0, 90075234, 19000822);
        }
        if (IsPlayerNo(2)) {
            InitializeCommonEvent(0, 90075230, 19000822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19000823, 10003, 1);
            InitializeCommonEvent(0, 90075230, 19000824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19000832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19000833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19000834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19000823);
            InitializeCommonEvent(0, 90075232, 19000823);
            InitializeCommonEvent(0, 90075233, 19000823);
            InitializeCommonEvent(0, 90075234, 19000823);
        }
        if (IsPlayerNo(3)) {
            InitializeCommonEvent(0, 90075230, 19000822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19000823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19000824, 10004, 1);
            InitializeCommonEvent(0, 90075230, 19000832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19000833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19000834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19000824);
            InitializeCommonEvent(0, 90075232, 19000824);
            InitializeCommonEvent(0, 90075233, 19000824);
            InitializeCommonEvent(0, 90075234, 19000824);
        }
        if (IsPlayerNo(4)) {
            InitializeCommonEvent(0, 90075230, 19000822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19000823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19000824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19000832, 10005, 1);
            InitializeCommonEvent(0, 90075230, 19000833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19000834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19000832);
            InitializeCommonEvent(0, 90075232, 19000832);
            InitializeCommonEvent(0, 90075233, 19000832);
            InitializeCommonEvent(0, 90075234, 19000832);
        }
        if (IsPlayerNo(5)) {
            InitializeCommonEvent(0, 90075230, 19000822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19000823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19000824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19000832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19000833, 10006, 1);
            InitializeCommonEvent(0, 90075230, 19000834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19000833);
            InitializeCommonEvent(0, 90075232, 19000833);
            InitializeCommonEvent(0, 90075233, 19000833);
            InitializeCommonEvent(0, 90075234, 19000833);
        }
        if (IsPlayerNo(6)) {
            InitializeCommonEvent(0, 90075230, 19000822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19000823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19000824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19000832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19000833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19000834, 10007, 1);
            InitializeCommonEvent(0, 90075231, 19000834);
            InitializeCommonEvent(0, 90075232, 19000834);
            InitializeCommonEvent(0, 90075233, 19000834);
            InitializeCommonEvent(0, 90075234, 19000834);
        }
        InitializeCommonEvent(0, 90015008, 7511, 7512, 752000, 19005821, 5105, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006821, 19005821, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006822, 19005821, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006823, 19005821, 5108, 0);
        InitializeCommonEvent(0, 90075240, 7511, 7512, 0, 19005821, 5108, 0);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19000827);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(3)) {
        InitializeCommonEvent(0, 90075900, 19000830);
        InitializeEvent(0, 190075901, 19000830, 754000, 907540000);
        InitializeCommonEvent(0, 90075902, 19000830, 0, 0);
        InitializeCommonEvent(0, 90015012, 19000830, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 90075300, 19000830, 19000220, 19000221);
        InitializeCommonEvent(0, 90075301, 19000830, 19005835, 19005836);
        InitializeCommonEvent(0, 90075310, 19000830, 19000200, 19000201, 19000202, 19000203, 19000204, 19000205, 19000206, 19000207, 19000208, 19000209, 19000210, 19000211, 19000212, 19000213, 19000214, 19000215, 19000216, 19000217, 19000218, 19000219);
        InitializeCommonEvent(0, 90075311, 19000830, 19000200, 19000201, 19000202, 19000203, 19000204, 19000205, 19000206, 19000207, 19000208, 19000209, 19000210, 19000211, 19000212, 19000213, 19000214, 19000215, 19000216, 19000217, 19000218, 19000219);
        InitializeCommonEvent(0, 90075312, 19000830, 19000200, 19000201, 19000202, 19000203, 19000204, 19000205, 19000206, 19000207, 19000208, 19000209, 19000210, 19000211, 19000212, 19000213, 19000214, 19000215, 19000216, 19000217);
        InitializeCommonEvent(0, 90075313, 19000830, 19000220, 19000221, 19000222);
        InitializeCommonEvent(0, 90075320, 19000830, 19005836);
        InitializeCommonEvent(0, 90075330, 19000830);
        InitializeCommonEvent(0, 90015008, 7511, 7512, 754000, 19000830, 5105, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006830, 19000830, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006831, 19000830, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006832, 19000830, 5108, 0);
        InitializeCommonEvent(0, 90075340, 7511, 7512, 0, 19000830, 5108, 0);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19000830);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(3)) {
        InitializeCommonEvent(0, 90075302, 19000830, 19000200);
        InitializeCommonEvent(0, 90075302, 19000830, 19000201);
        InitializeCommonEvent(0, 90075302, 19000830, 19000202);
        InitializeCommonEvent(0, 90075302, 19000830, 19000203);
        InitializeCommonEvent(0, 90075302, 19000830, 19000204);
        InitializeCommonEvent(0, 90075302, 19000830, 19000205);
        InitializeCommonEvent(0, 90075302, 19000830, 19000206);
        InitializeCommonEvent(0, 90075302, 19000830, 19000207);
        InitializeCommonEvent(0, 90075302, 19000830, 19000208);
        InitializeCommonEvent(0, 90075302, 19000830, 19000209);
        InitializeCommonEvent(0, 90075302, 19000830, 19000210);
        InitializeCommonEvent(0, 90075302, 19000830, 19000211);
        InitializeCommonEvent(0, 90075302, 19000830, 19000212);
        InitializeCommonEvent(0, 90075302, 19000830, 19000213);
        InitializeCommonEvent(0, 90075302, 19000830, 19000214);
        InitializeCommonEvent(0, 90075302, 19000830, 19000215);
        InitializeCommonEvent(0, 90075302, 19000830, 19000216);
        InitializeCommonEvent(0, 90075302, 19000830, 19000217);
        InitializeCommonEvent(0, 90075302, 19000830, 19000218);
        InitializeCommonEvent(0, 90075302, 19000830, 19000219);
    }
    if (IsMapVariation(3)) {
        InitializeCommonEvent(0, 90075302, 19000830, 19000220);
        InitializeCommonEvent(0, 90075302, 19000830, 19000221);
        InitializeCommonEvent(0, 90075302, 19000830, 19000222);
    }
    if (IsMapVariation(3)) {
        InitializeCommonEvent(0, 90075302, 19000830, 19000230);
        InitializeCommonEvent(0, 90075302, 19000830, 19000231);
        InitializeCommonEvent(0, 90075302, 19000830, 19000232);
        InitializeCommonEvent(0, 90075302, 19000830, 19000233);
        InitializeCommonEvent(0, 90075302, 19000830, 19000234);
        InitializeCommonEvent(0, 90075302, 19000830, 19000235);
        InitializeCommonEvent(0, 90075302, 19000830, 19000236);
        InitializeCommonEvent(0, 90075302, 19000830, 19000237);
        InitializeCommonEvent(0, 90075302, 19000830, 19000238);
        InitializeCommonEvent(0, 90075302, 19000830, 19000239);
        InitializeCommonEvent(0, 90075302, 19000830, 19000240);
        InitializeCommonEvent(0, 90075302, 19000830, 19000241);
        InitializeCommonEvent(0, 90075302, 19000830, 19000242);
        InitializeCommonEvent(0, 90075302, 19000830, 19000243);
        InitializeCommonEvent(0, 90075302, 19000830, 19000244);
        InitializeCommonEvent(0, 90075302, 19000830, 19000245);
        InitializeCommonEvent(0, 90075302, 19000830, 19000246);
        InitializeCommonEvent(0, 90075302, 19000830, 19000247);
        InitializeCommonEvent(0, 90075302, 19000830, 19000248);
        InitializeCommonEvent(0, 90075302, 19000830, 19000249);
        InitializeCommonEvent(0, 90075302, 19000830, 19000250);
        InitializeCommonEvent(0, 90075302, 19000830, 19000251);
        InitializeCommonEvent(0, 90075302, 19000830, 19000252);
        InitializeCommonEvent(0, 90075302, 19000830, 19000253);
        InitializeCommonEvent(0, 90075302, 19000830, 19000254);
        InitializeCommonEvent(0, 90075302, 19000830, 19000255);
        InitializeCommonEvent(0, 90075302, 19000830, 19000256);
        InitializeCommonEvent(0, 90075302, 19000830, 19000257);
        InitializeCommonEvent(0, 90075302, 19000830, 19000258);
        InitializeCommonEvent(0, 90075302, 19000830, 19000259);
        InitializeCommonEvent(0, 90075302, 19000830, 19000260);
        InitializeCommonEvent(0, 90075302, 19000830, 19000261);
        InitializeCommonEvent(0, 90075302, 19000830, 19000262);
        InitializeCommonEvent(0, 90075302, 19000830, 19000263);
        InitializeCommonEvent(0, 90075302, 19000830, 19000264);
        InitializeCommonEvent(0, 90075302, 19000830, 19000265);
        InitializeCommonEvent(0, 90075302, 19000830, 19000266);
        InitializeCommonEvent(0, 90075302, 19000830, 19000267);
        InitializeCommonEvent(0, 90075302, 19000830, 19000268);
        InitializeCommonEvent(0, 90075302, 19000830, 19000269);
        InitializeCommonEvent(0, 90075302, 19000830, 19000270);
        InitializeCommonEvent(0, 90075302, 19000830, 19000271);
        InitializeCommonEvent(0, 90075302, 19000830, 19000272);
        InitializeCommonEvent(0, 90075302, 19000830, 19000273);
        InitializeCommonEvent(0, 90075302, 19000830, 19000274);
        InitializeCommonEvent(0, 90075302, 19000830, 19000275);
        InitializeCommonEvent(0, 90075302, 19000830, 19000276);
    }
    if (IsMapVariation(4)) {
        InitializeCommonEvent(0, 90075400, 19000840, 19000849, 19000440, 19000441, 19000442, 19000443, 19000444, 19000445, 19000446, 19000447);
        InitializeCommonEvent(0, 90075401, 19000849, 19000240, 19000241, 19000242);
        InitializeCommonEvent(0, 90075402, 19000849, 19000840, 19000240, 19000241, 19000242);
        InitializeCommonEvent(0, 90075403, 19000849, 19004740, 19004741, 19004742, 19000240, 19000242);
        if (IsPlayerNo(1)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000243, 19004744, 19000246);
        }
        if (IsPlayerNo(2)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000244, 19004744, 19000247);
        }
        if (IsPlayerNo(3)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000245, 19004744, 19000248);
        }
        if (IsPlayerNo(4)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000343, 19004744, 19000346);
        }
        if (IsPlayerNo(5)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000344, 19004744, 19000347);
        }
        if (IsPlayerNo(6)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000345, 19004744, 19000348);
        }
        InitializeEvent(0, 190075405, 19000240, 19000241, 19000246, 19000247, 19000248);
        InitializeCommonEvent(0, 99075406, 19000849, 19000240, 19000701, 19000241);
        InitializeCommonEvent(0, 99075410, 19000840);
        InitializeCommonEvent(0, 99075420, 19000840);
        InitializeCommonEvent(0, 99075421, 19000840);
        InitializeCommonEvent(0, 99075422, 19000840, 19002740, 19002741, 19002742, 19002743, 19002744, 19002745, 19002746, 19002747, 19000440, 19000441, 19000442, 19000443, 19000444, 19000445, 19000446, 19000447);
        InitializeEvent(0, 190075901, 19000840, 756000, 907550000);
        InitializeCommonEvent(0, 90075902, 19005840, 0, 0);
        InitializeCommonEvent(0, 90015012, 19005840, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 99075430, 19000840);
        InitializeCommonEvent(0, 90015018, 7511, 7512, 756000, 19000840, 45889, 1065353216);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006840, 19000840, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006841, 19000840, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006842, 19000840, 5108, 0);
        InitializeCommonEvent(0, 99075440, 7511, 7512, 0, 19000840, 5108, 0);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19000840);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(5)) {
        InitializeCommonEvent(0, 90075900, 19000850);
        InitializeEvent(0, 190075901, 19000850, 760000, 907610001);
        InitializeCommonEvent(0, 90075902, 19000850, 0, 0);
        InitializeCommonEvent(0, 90075500, 19000850);
        InitializeCommonEvent(0, 90075501, 19000850);
        InitializeCommonEvent(0, 90075510, 19000850);
        InitializeCommonEvent(0, 90015012, 19000850, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 90015008, 7511, 7512, 760000, 19000850, 5105, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006850, 19000850, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006851, 19000850, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006852, 19000850, 5108, 0);
        InitializeCommonEvent(0, 90075520, 7511, 7512, 0, 19000850, 5108, 0);
        
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19000850);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(6)) {
        InitializeCommonEvent(0, 90075900, 19000860);
        InitializeEvent(0, 190075901, 19000860, 490000, 907620000);
        InitializeCommonEvent(0, 90075902, 19000860, 0, 0);
        InitializeCommonEvent(0, 90075600, 19000860, 19002860);
        InitializeCommonEvent(0, 90075601, 19000860);
        InitializeCommonEvent(0, 90015012, 19000860, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeEvent(0, 190075610, 19000860);
        
        InitializeCommonEvent(0, 90015008, 7511, 7512, 490000, 19000860, 5105, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006860, 19000860, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006861, 19000860, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006862, 19000860, 5108, 0);
        InitializeCommonEvent(0, 99075620, 7511, 7512, 0, 19000860, 5108, 0);
        InitializeCommonEvent(0, 90075602, 19000860);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19000860);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(10)) {
        InitializeCommonEvent(0, 90075900, 19010800);
        InitializeEvent(0, 190075901, 19010800, 750000, 907500000);
        InitializeCommonEvent(0, 90075902, 19010800, 19015801, 0);
        InitializeCommonEvent(0, 90015012, 19010800, 7511);
        InitializeCommonEvent(1, 90015012, 19015801, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 90075000, 19010800, 19015801);
        InitializeCommonEvent(0, 90075051, 19010800, 19015801, 19010801, 19010802);
        InitializeCommonEvent(0, 90075002, 19010800, 19010801, 19010802);
        InitializeCommonEvent(0, 90075005, 19010800, 19010801, 72, 5900);
        InitializeCommonEvent(0, 90075005, 19010800, 19010802, 2, 5901);
        InitializeCommonEvent(0, 90075006, 19010800, 19010801);
        InitializeCommonEvent(0, 90075006, 19010800, 19010802);
        InitializeCommonEvent(0, 90075060, 19010800, 19010801);
        InitializeCommonEvent(0, 90075060, 19010800, 19010802);
        InitializeCommonEvent(0, 90075070, 19010800, 19010801, 72, 5908, 51320);
        InitializeCommonEvent(0, 90075070, 19010800, 19010802, 72, 5909, 51321);
        InitializeEvent(0, 190075950, 750000, 19010800, 5106, 0);
        
        InitializeCommonEvent(0, 90075910, 6001, 7512, 19006800, 19010800, 0, 1065353216);
        InitializeCommonEvent(0, 90075910, 6001, 7512, 19006801, 19010800, 0, 1065353216);
        InitializeCommonEvent(0, 90075910, 6001, 7512, 19006802, 19010800, 0, 1065353216);
        InitializeCommonEvent(0, 90075008, 6001, 7512, 0, 19010800, 0, 1065353216);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19010800);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(11)) {
        InitializeCommonEvent(0, 90075161, 19010810);
        InitializeCommonEvent(0, 90075102, 19010810);
        InitializeCommonEvent(0, 90075900, 19010810);
        InitializeEvent(0, 190075901, 19010810, 751000, 907510000);
        InitializeCommonEvent(0, 90075902, 19010810, 0, 0);
        InitializeEvent(0, 190075950, 751000, 19010810, 5106, 0);
        InitializeCommonEvent(0, 90015012, 19010810, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006810, 19010810, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006811, 19010810, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006812, 19010810, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006813, 19010810, 5108, 0);
        InitializeCommonEvent(0, 90075150, 7511, 7512, 0, 19010810, 5108, 0);
        InitializeCommonEvent(0, 90075160, 19010810, 19010811, 19010812);
        InitializeCommonEvent(0, 90075162, 19010810, 19010811);
        InitializeCommonEvent(0, 90075163, 19010810, 19010811);
        InitializeCommonEvent(0, 90075164, 0);
        InitializeCommonEvent(0, 90075165, 19010810);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19010810);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(12)) {
        InitializeCommonEvent(0, 90075900, 19015821);
        InitializeEvent(0, 190075901, 19010828, 752000, 907520002);
        InitializeCommonEvent(0, 90075903, 19, 19015821, 19010827, 0);
        InitializeCommonEvent(0, 90015012, 19015821, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeEvent(0, 190075950, 752000, 19010828, 5106, 0);
        InitializeCommonEvent(0, 90075250, 19015821, 19010825, 19010826, 19010827);
        InitializeCommonEvent(0, 90075251, 19015821, 19010825, 19010826, 19010827, 19010828, 19002820, 19000220, 19000221, 19000222, 19000322);
        InitializeCommonEvent(0, 90075257, 19010827, 19010828, 19010825, 19010826);
        InitializeCommonEvent(0, 90075220, 19010825, 19000222);
        InitializeCommonEvent(0, 90075212, 19010827, 19010825, 19010826, 19000220, 19000221, 19000222, 1);
        InitializeCommonEvent(0, 90075266, 19010825, 1);
        InitializeCommonEvent(0, 90075266, 19010826, 0);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19010828);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(12)) {
        if (IsPlayerNo(1)) {
            InitializeCommonEvent(0, 90075230, 19010822, 10002, 1);
            InitializeCommonEvent(0, 90075230, 19010823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19010824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19010832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19010833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19010834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19010822);
            InitializeCommonEvent(0, 90075232, 19010822);
            InitializeCommonEvent(0, 90075233, 19010822);
            InitializeCommonEvent(0, 90075234, 19010822);
        }
        if (IsPlayerNo(2)) {
            InitializeCommonEvent(0, 90075230, 19010822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19010823, 10003, 1);
            InitializeCommonEvent(0, 90075230, 19010824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19010832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19010833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19010834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19010823);
            InitializeCommonEvent(0, 90075232, 19010823);
            InitializeCommonEvent(0, 90075233, 19010823);
            InitializeCommonEvent(0, 90075234, 19010823);
        }
        if (IsPlayerNo(3)) {
            InitializeCommonEvent(0, 90075230, 19010822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19010823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19010824, 10004, 1);
            InitializeCommonEvent(0, 90075230, 19010832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19010833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19010834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19010824);
            InitializeCommonEvent(0, 90075232, 19010824);
            InitializeCommonEvent(0, 90075233, 19010824);
            InitializeCommonEvent(0, 90075234, 19010824);
        }
        if (IsPlayerNo(4)) {
            InitializeCommonEvent(0, 90075230, 19010822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19010823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19010824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19010832, 10005, 1);
            InitializeCommonEvent(0, 90075230, 19010833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19010834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19010832);
            InitializeCommonEvent(0, 90075232, 19010832);
            InitializeCommonEvent(0, 90075233, 19010832);
            InitializeCommonEvent(0, 90075234, 19010832);
        }
        if (IsPlayerNo(5)) {
            InitializeCommonEvent(0, 90075230, 19010822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19010823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19010824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19010832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19010833, 10006, 1);
            InitializeCommonEvent(0, 90075230, 19010834, 10007, 0);
            InitializeCommonEvent(0, 90075231, 19010833);
            InitializeCommonEvent(0, 90075232, 19010833);
            InitializeCommonEvent(0, 90075233, 19010833);
            InitializeCommonEvent(0, 90075234, 19010833);
        }
        if (IsPlayerNo(6)) {
            InitializeCommonEvent(0, 90075230, 19010822, 10002, 0);
            InitializeCommonEvent(0, 90075230, 19010823, 10003, 0);
            InitializeCommonEvent(0, 90075230, 19010824, 10004, 0);
            InitializeCommonEvent(0, 90075230, 19010832, 10005, 0);
            InitializeCommonEvent(0, 90075230, 19010833, 10006, 0);
            InitializeCommonEvent(0, 90075230, 19010834, 10007, 1);
            InitializeCommonEvent(0, 90075231, 19010834);
            InitializeCommonEvent(0, 90075232, 19010834);
            InitializeCommonEvent(0, 90075233, 19010834);
            InitializeCommonEvent(0, 90075234, 19010834);
        }
    }
    if (IsMapVariation(12)) {
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006821, 19015821, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006822, 19015821, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006823, 19015821, 5108, 0);
        InitializeCommonEvent(0, 90075240, 7511, 7512, 0, 19015821, 5108, 0);
        InitializeCommonEvent(0, 90075255, 19010825, 19010826, 19010828, 19010827, 19002820, 19000322);
        InitializeCommonEvent(0, 90075256, 19010825, 19010826, 19010828, 19010827, 19000322);
        InitializeCommonEvent(0, 90075263, 19010828);
        InitializeCommonEvent(0, 90075267, 19010825, 19010826, 19010828, 19000322, 19000323);
        InitializeCommonEvent(0, 90075260, 19010825, 19010828, 47150, 47152, 19000322);
        InitializeCommonEvent(0, 90075261, 19010825, 19010828, 47170, 47190, 19000322, 19000323);
        InitializeCommonEvent(0, 90075262, 19010825, 19010828, 19010827, 47111, 47190, 19000322, 19000323);
        InitializeCommonEvent(0, 90075264, 19010825, 19010828, 19000322);
        InitializeCommonEvent(0, 90075265, 19010825, 19010828, 47111, 19000322);
        InitializeCommonEvent(0, 90075260, 19010826, 19010828, 47151, 47153, 19000322);
        InitializeCommonEvent(0, 90075261, 19010826, 19010828, 47171, 47191, 19000322, 19000323);
        InitializeCommonEvent(0, 90075262, 19010826, 19010828, 19010827, 47116, 47191, 19000322, 19000323);
        InitializeCommonEvent(0, 90075264, 19010826, 19010828, 19000322);
        InitializeCommonEvent(0, 90075265, 19010826, 19010828, 47116, 19000322);
    }
    if (IsMapVariation(13)) {
        InitializeCommonEvent(0, 90075900, 19010830);
        InitializeEvent(0, 190075901, 19010831, 754000, 907540000);
        InitializeCommonEvent(0, 90075902, 19010830, 19010831, 0);
        InitializeCommonEvent(0, 90015012, 19010830, 7511);
        InitializeCommonEvent(0, 90015012, 19010831, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 90075350, 19010830, 19010831, 19010220, 19010221);
        InitializeCommonEvent(0, 90075351, 19010830, 19015835, 19015836, 19000230);
        InitializeCommonEvent(0, 90075352, 19010830, 19010831, 19000230);
        InitializeCommonEvent(0, 90075330, 19010830);
        InitializeEvent(0, 190075950, 754000, 19010831, 5106, 0);
        
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006830, 19010830, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006831, 19010830, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006832, 19010830, 5108, 0);
        InitializeCommonEvent(0, 90075340, 7511, 7512, 0, 19010831, 5108, 0);
        InitializeCommonEvent(0, 90075360, 19010831, 45720, 10, 10, 1, 223, 12, 45721, 45740, 45725, 45730);
        InitializeCommonEvent(0, 90075360, 19010831, 45720, 11, 11, 1, 224, 13, 45721, 45741, 45725, 45731);
        InitializeCommonEvent(0, 90075360, 19010831, 45720, 12, 12, 1, 225, 14, 45721, 45742, 45725, 45732);
        InitializeCommonEvent(0, 90075360, 19010831, 45720, 13, 13, 1, 226, 10, 45721, 45743, 45725, 45733);
        InitializeCommonEvent(0, 90075360, 19010831, 45720, 14, 14, 1, 227, 11, 45721, 45744, 45725, 45734);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19010831);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(13)) {
        InitializeCommonEvent(0, 90075310, 19010830, 19010200, 19010201, 19010202, 19010203, 19010204, 19010205, 19010206, 19010207, 19010208, 19010209, 19010210, 19010211, 19010212, 19010213, 19010214, 19010215, 19010216, 19010217, 19010218, 19010219);
        InitializeCommonEvent(0, 90075311, 19010830, 19010200, 19010201, 19010202, 19010203, 19010204, 19010205, 19010206, 19010207, 19010208, 19010209, 19010210, 19010211, 19010212, 19010213, 19010214, 19010215, 19010216, 19010217, 19010218, 19010219);
        InitializeCommonEvent(0, 90075312, 19010830, 19010200, 19010201, 19010202, 19010203, 19010204, 19010205, 19010206, 19010207, 19010208, 19010209, 19010210, 19010211, 19010212, 19010213, 19010214, 19010215, 19010216, 19010217);
        InitializeCommonEvent(0, 90075313, 19010830, 19010220, 19010221, 19010222);
        InitializeCommonEvent(0, 90075320, 19010830, 19015836);
    }
    if (IsMapVariation(13)) {
        InitializeCommonEvent(0, 90075302, 19010830, 19010200);
        InitializeCommonEvent(0, 90075302, 19010830, 19010201);
        InitializeCommonEvent(0, 90075302, 19010830, 19010202);
        InitializeCommonEvent(0, 90075302, 19010830, 19010203);
        InitializeCommonEvent(0, 90075302, 19010830, 19010204);
        InitializeCommonEvent(0, 90075302, 19010830, 19010205);
        InitializeCommonEvent(0, 90075302, 19010830, 19010206);
        InitializeCommonEvent(0, 90075302, 19010830, 19010207);
        InitializeCommonEvent(0, 90075302, 19010830, 19010208);
        InitializeCommonEvent(0, 90075302, 19010830, 19010209);
        InitializeCommonEvent(0, 90075302, 19010830, 19010210);
        InitializeCommonEvent(0, 90075302, 19010830, 19010211);
        InitializeCommonEvent(0, 90075302, 19010830, 19010212);
        InitializeCommonEvent(0, 90075302, 19010830, 19010213);
        InitializeCommonEvent(0, 90075302, 19010830, 19010214);
        InitializeCommonEvent(0, 90075302, 19010830, 19010215);
        InitializeCommonEvent(0, 90075302, 19010830, 19010216);
        InitializeCommonEvent(0, 90075302, 19010830, 19010217);
        InitializeCommonEvent(0, 90075302, 19010830, 19010218);
        InitializeCommonEvent(0, 90075302, 19010830, 19010219);
    }
    if (IsMapVariation(13)) {
        InitializeCommonEvent(0, 90075302, 19010830, 19010220);
        InitializeCommonEvent(0, 90075302, 19010830, 19010221);
        InitializeCommonEvent(0, 90075302, 19010830, 19010222);
    }
    if (IsMapVariation(13)) {
        InitializeCommonEvent(0, 90075302, 19010830, 19010230);
        InitializeCommonEvent(0, 90075302, 19010830, 19010231);
        InitializeCommonEvent(0, 90075302, 19010830, 19010232);
        InitializeCommonEvent(0, 90075302, 19010830, 19010233);
        InitializeCommonEvent(0, 90075302, 19010830, 19010234);
        InitializeCommonEvent(0, 90075302, 19010830, 19010235);
        InitializeCommonEvent(0, 90075302, 19010830, 19010236);
        InitializeCommonEvent(0, 90075302, 19010830, 19010237);
        InitializeCommonEvent(0, 90075302, 19010830, 19010238);
        InitializeCommonEvent(0, 90075302, 19010830, 19010239);
        InitializeCommonEvent(0, 90075302, 19010830, 19010240);
        InitializeCommonEvent(0, 90075302, 19010830, 19010241);
        InitializeCommonEvent(0, 90075302, 19010830, 19010242);
        InitializeCommonEvent(0, 90075302, 19010830, 19010243);
        InitializeCommonEvent(0, 90075302, 19010830, 19010244);
        InitializeCommonEvent(0, 90075302, 19010830, 19010245);
        InitializeCommonEvent(0, 90075302, 19010830, 19010246);
        InitializeCommonEvent(0, 90075302, 19010830, 19010247);
        InitializeCommonEvent(0, 90075302, 19010830, 19010248);
        InitializeCommonEvent(0, 90075302, 19010830, 19010249);
        InitializeCommonEvent(0, 90075302, 19010830, 19010250);
        InitializeCommonEvent(0, 90075302, 19010830, 19010251);
        InitializeCommonEvent(0, 90075302, 19010830, 19010252);
        InitializeCommonEvent(0, 90075302, 19010830, 19010253);
        InitializeCommonEvent(0, 90075302, 19010830, 19010254);
        InitializeCommonEvent(0, 90075302, 19010830, 19010255);
        InitializeCommonEvent(0, 90075302, 19010830, 19010256);
        InitializeCommonEvent(0, 90075302, 19010830, 19010257);
        InitializeCommonEvent(0, 90075302, 19010830, 19010258);
        InitializeCommonEvent(0, 90075302, 19010830, 19010259);
        InitializeCommonEvent(0, 90075302, 19010830, 19010260);
        InitializeCommonEvent(0, 90075302, 19010830, 19010261);
        InitializeCommonEvent(0, 90075302, 19010830, 19010262);
        InitializeCommonEvent(0, 90075302, 19010830, 19010263);
        InitializeCommonEvent(0, 90075302, 19010830, 19010264);
        InitializeCommonEvent(0, 90075302, 19010830, 19010265);
        InitializeCommonEvent(0, 90075302, 19010830, 19010266);
        InitializeCommonEvent(0, 90075302, 19010830, 19010267);
        InitializeCommonEvent(0, 90075302, 19010830, 19010268);
        InitializeCommonEvent(0, 90075302, 19010830, 19010269);
        InitializeCommonEvent(0, 90075302, 19010830, 19010270);
        InitializeCommonEvent(0, 90075302, 19010830, 19010271);
        InitializeCommonEvent(0, 90075302, 19010830, 19010272);
        InitializeCommonEvent(0, 90075302, 19010830, 19010273);
        InitializeCommonEvent(0, 90075302, 19010830, 19010274);
        InitializeCommonEvent(0, 90075302, 19010830, 19010275);
        InitializeCommonEvent(0, 90075302, 19010830, 19010276);
    }
    if (IsMapVariation(14)) {
        InitializeCommonEvent(0, 90075450, 19010840, 19010849, 19010440, 19010441, 19010442, 19010443, 19010444, 19010445, 19010446, 19010447, 19015842, 19015843, 19015844, 19015845, 19015846, 19015847);
        InitializeCommonEvent(0, 90075401, 19010849, 19000240, 19000241, 19000242);
        InitializeEvent(0, 190075452, 19010849, 19010840, 19000240, 19000241, 19000242);
        InitializeCommonEvent(0, 90075403, 19010849, 19004740, 19004741, 19004742, 19000240, 19000242);
        if (IsPlayerNo(1)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000243, 19004744, 19000246);
        }
        if (IsPlayerNo(2)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000244, 19004744, 19000247);
        }
        if (IsPlayerNo(3)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000245, 19004744, 19000248);
        }
        if (IsPlayerNo(4)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000343, 19004744, 19000346);
        }
        if (IsPlayerNo(5)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000344, 19004744, 19000347);
        }
        if (IsPlayerNo(6)) {
            InitializeCommonEvent(0, 90075404, 19000240, 19004743, 19000345, 19004744, 19000348);
        }
        InitializeEvent(0, 190075405, 19000240, 19000241, 19000246, 19000247, 19000248);
        InitializeCommonEvent(0, 99075406, 19010849, 19000240, 19000701, 19000241);
        InitializeCommonEvent(0, 99075410, 19010840);
        InitializeCommonEvent(0, 99075420, 19010840);
        InitializeCommonEvent(0, 99075421, 19010840);
        InitializeCommonEvent(0, 99075422, 19010840, 19002740, 19002741, 19002742, 19002743, 19002744, 19002745, 19002746, 19002747, 19010440, 19010441, 19010442, 19010443, 19010444, 19010445, 19010446, 19010447);
        InitializeEvent(0, 190075901, 19010840, 756000, 907550000);
        InitializeCommonEvent(0, 90075902, 19015840, 0, 0);
        InitializeCommonEvent(0, 90075902, 19015842, 19015843, 19015844);
        InitializeCommonEvent(0, 90075902, 19015845, 19015846, 19015847);
        InitializeCommonEvent(0, 90015012, 19015840, 7511);
        InitializeCommonEvent(0, 90015022, 19015842, 7511);
        InitializeCommonEvent(0, 90015022, 19015843, 7511);
        InitializeCommonEvent(0, 90015022, 19015844, 7511);
        InitializeCommonEvent(0, 90015022, 19015845, 7511);
        InitializeCommonEvent(0, 90015022, 19015846, 7511);
        InitializeCommonEvent(0, 90015022, 19015847, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 99075485, 19010840, 19000270);
        InitializeEvent(0, 199075486, 19010840);
        InitializeEvent(0, 190075950, 756000, 19010840, 5106, 1056964608);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006840, 19010840, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006841, 19010840, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006842, 19010840, 5108, 0);
        InitializeCommonEvent(0, 99075440, 7511, 7512, 0, 19010840, 5108, 0);
                
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19010840);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(14)) {
        InitializeCommonEvent(0, 90015012, 19015842, 7511);
        InitializeCommonEvent(0, 99075466, 19010840, 10002, 19010450, 110, 19011250, 19000250, 19000260);
        InitializeCommonEvent(0, 99075468, 19010840, 19010453, 113, 19011253, 19000250, 19000263);
        InitializeCommonEvent(0, 99075467, 19010840, 19010450, 19000260);
        InitializeCommonEvent(0, 99075467, 19010840, 19010453, 19000253);
        InitializeCommonEvent(0, 90015012, 19015843, 7511);
        InitializeCommonEvent(0, 99075466, 19010840, 10003, 19010451, 111, 19011251, 19000251, 19000261);
        InitializeCommonEvent(0, 99075468, 19010840, 19010454, 114, 19011254, 19000251, 19000264);
        InitializeCommonEvent(0, 99075467, 19010840, 19010451, 19000261);
        InitializeCommonEvent(0, 99075467, 19010840, 19010454, 19000254);
        InitializeCommonEvent(0, 90015012, 19015844, 7511);
        InitializeCommonEvent(0, 99075466, 19010840, 10004, 19010452, 112, 19011252, 19000252, 19000262);
        InitializeCommonEvent(0, 99075468, 19010840, 19010455, 115, 19011255, 19000252, 19000265);
        InitializeCommonEvent(0, 99075467, 19010840, 19010452, 19000262);
        InitializeCommonEvent(0, 99075467, 19010840, 19010455, 19000255);
        InitializeCommonEvent(0, 90015012, 19015845, 7511);
        InitializeCommonEvent(0, 99075466, 19010840, 10005, 19010460, 116, 19011350, 19000350, 19000360);
        InitializeCommonEvent(0, 99075468, 19010840, 19010463, 119, 19011353, 19000350, 19000363);
        InitializeCommonEvent(0, 99075467, 19010840, 19010460, 19000360);
        InitializeCommonEvent(0, 99075467, 19010840, 19010463, 19000353);
        InitializeCommonEvent(0, 90015012, 19015846, 7511);
        InitializeCommonEvent(0, 99075466, 19010840, 10006, 19010461, 117, 19011351, 19000351, 19000361);
        InitializeCommonEvent(0, 99075468, 19010840, 19010464, 120, 19011354, 19000351, 19000364);
        InitializeCommonEvent(0, 99075467, 19010840, 19010461, 19000361);
        InitializeCommonEvent(0, 99075467, 19010840, 19010464, 19000354);
        InitializeCommonEvent(0, 90015012, 19015847, 7511);
        InitializeCommonEvent(0, 99075466, 19010840, 10007, 19010462, 118, 19011352, 19000352, 19000362);
        InitializeCommonEvent(0, 99075468, 19010840, 19010465, 121, 19011355, 19000352, 19000365);
        InitializeCommonEvent(0, 99075467, 19010840, 19010462, 19000362);
        InitializeCommonEvent(0, 99075467, 19010840, 19010465, 19000355);
        InitializeCommonEvent(0, 99075471, 19010840, 19000250, 19000260, 19000251, 19000261, 19000252, 19000262, 19000350, 19000360, 19000351, 19000361, 19000352, 19000362);
        InitializeCommonEvent(0, 99075470, 19010840, 49691, 8002);
    }
    if (IsMapVariation(14)) {
        InitializeCommonEvent(0, 99075480, 19010840, 20000, 49690, 49702, 0, 49703, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 20000, 49690, 446, 0, 447, 1);
        if (!IsPlayerNo(1)) {
            InitializeCommonEvent(0, 99075481, 19010840, 10002);
        }
        if (!IsPlayerNo(2)) {
            InitializeCommonEvent(0, 99075481, 19010840, 10003);
        }
        if (!IsPlayerNo(3)) {
            InitializeCommonEvent(0, 99075481, 19010840, 10004);
        }
        if (!IsPlayerNo(4)) {
            InitializeCommonEvent(0, 99075481, 19010840, 10005);
        }
        if (!IsPlayerNo(5)) {
            InitializeCommonEvent(0, 99075481, 19010840, 10006);
        }
        if (!IsPlayerNo(6)) {
            InitializeCommonEvent(0, 99075481, 19010840, 10007);
        }
        InitializeCommonEvent(0, 99075470, 19010840, 49690, 8001);
    }
    if (IsMapVariation(14)) {
        InitializeCommonEvent(0, 99075480, 19010840, 20000, 49692, 49720, 49721, 0, 0);
        InitializeCommonEvent(0, 99075480, 19010840, 20000, 49692, 49723, 0, 49724, 1);
        InitializeCommonEvent(0, 99075470, 19010840, 49692, 8003);
    }
    if (IsMapVariation(14)) {
        InitializeCommonEvent(0, 99075480, 19010840, 20000, 49693, 49731, 0, 49733, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010450, 49693, 49731, 0, 49733, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010451, 49693, 49731, 0, 49733, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010452, 49693, 49731, 0, 49733, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010460, 49693, 49731, 0, 49733, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010461, 49693, 49731, 0, 49733, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010462, 49693, 49731, 0, 49733, 1);
        InitializeCommonEvent(0, 99075470, 19010840, 49693, 8004);
    }
    if (IsMapVariation(14)) {
        InitializeCommonEvent(0, 99075480, 19010840, 20000, 49694, 49742, 0, 49747, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 20000, 49694, 49746, 0, 49748, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010450, 49694, 49741, 0, 49749, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010451, 49694, 49741, 0, 49749, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010452, 49694, 49741, 0, 49749, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010460, 49694, 49741, 0, 49749, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010461, 49694, 49741, 0, 49749, 1);
        InitializeCommonEvent(0, 99075480, 19010840, 19010462, 49694, 49741, 0, 49749, 1);
        InitializeCommonEvent(0, 99075470, 19010840, 49694, 8005);
    }
    if (IsMapVariation(14)) {
        InitializeCommonEvent(0, 99075483, 19010840);
        InitializeCommonEvent(0, 99075470, 19010840, 49695, 8006);
        InitializeCommonEvent(0, 99075482, 19010840);
    }
    if (IsMapVariation(15)) {
        InitializeCommonEvent(0, 90075900, 19010850);
        InitializeEvent(0, 190075901, 19010850, 760000, 907610000);
        InitializeCommonEvent(0, 90075902, 19010850, 0, 0);
        InitializeCommonEvent(0, 90075500, 19010850);
        InitializeCommonEvent(0, 90075950, 760000, 19010850, 5106, 0);
        InitializeCommonEvent(0, 90075551, 19010850);
        InitializeCommonEvent(0, 90075510, 19010850);
        InitializeCommonEvent(0, 90015012, 19010850, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006850, 19010850, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006851, 19010850, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006852, 19010850, 5108, 0);
        InitializeCommonEvent(0, 90075520, 7511, 7512, 0, 19010850, 5108, 0);
        
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19010850);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(16)) {
        InitializeCommonEvent(0, 90075900, 19010860);
        InitializeEvent(0, 190075901, 19010860, 490000, 907620000);
        InitializeCommonEvent(0, 90075902, 19010860, 0, 0);
        InitializeCommonEvent(0, 90075600, 19010860, 19002860);
        InitializeEvent(0, 190075651, 19010860);
        InitializeCommonEvent(0, 90015012, 19010860, 7511);
        InitializeCommonEvent(0, 90015020, 7511, 7512);
        InitializeEvent(0, 190075610, 19010860);
        InitializeCommonEvent(0, 90075660, 19010860, 51001, 51002, 51030, 15, 120, 10, 1, 11, 6, 0, 1, 0, 1, 0, 1);
        InitializeCommonEvent(0, 90075660, 19010860, 51003, 51004, 51031, 16, 130, 20, 2, 21, 3, 22, 4, 23, 5, 24, 8);
        InitializeCommonEvent(0, 90075660, 19010860, 51005, 51006, 51032, 17, 60, 30, 9, 31, 10, 32, 11, 33, 12, 0, 1);
        InitializeCommonEvent(0, 90075660, 19010860, 51007, 51008, 51033, 18, 120, 40, 7, 0, 1, 0, 1, 0, 1, 0, 1);
        InitializeEvent(0, 190075652, 19010860, 5105, 5106);
        InitializeEvent(0, 190075950, 490000, 19010860, 5106, 0);
        
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006860, 19010860, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006861, 19010860, 5108, 0);
        InitializeCommonEvent(0, 90075910, 7511, 7512, 19006862, 19010860, 5108, 0);
        InitializeCommonEvent(0, 99075620, 7511, 7512, 0, 19010860, 5108, 0);
        InitializeCommonEvent(0, 90075602, 19010860);
        
        $InitializeEvent(0, 19110900);  // 注册连战事件
        InitializeEvent(0, 19210900, 19010860);
        $InitializeEvent(0, 19002951);
    }
    if (IsMapVariation(2)) {
        $InitializeEvent(0, 19002890);
        $InitializeEvent(0, 19002891);
        $InitializeEvent(0, 19002892);
    }
    $InitializeEvent(0, 19002500);
    $InitializeEvent(0, 19002501);
    $InitializeEvent(0, 19002550);
    $InitializeEvent(0, 19002502);
    RegisterBonfire(19001500, 0, 5);
    RegisterBonfire(19001501, 0, 5);
    InitializeCommonEvent(0, 90075920, 0, 150, 9070);
    InitializeCommonEvent(1, 90075920, 1, 151, 9071);
    InitializeCommonEvent(2, 90075920, 2, 152, 9072);
    InitializeCommonEvent(3, 90075920, 3, 153, 9073);
    InitializeCommonEvent(4, 90075920, 4, 154, 9074);
    InitializeCommonEvent(5, 90075920, 5, 155, 9075);
    InitializeCommonEvent(6, 90075920, 6, 156, 9076);
    InitializeCommonEvent(0, 90075931, 0);
    InitializeCommonEvent(0, 90015200, 9307, 0);
    InitializeCommonEvent(0, 90015200, 9308, 1);
    InitializeCommonEvent(0, 90015200, 9309, 2);
    InitializeCommonEvent(0, 90015200, 9310, 3);
    InitializeCommonEvent(0, 90015200, 9311, 4);
    InitializeCommonEvent(0, 90015200, 9312, 5);
    InitializeCommonEvent(0, 90015200, 9313, 6);
    InitializeCommonEvent(0, 90015200, 9307, 10);
    InitializeCommonEvent(0, 90015200, 9308, 11);
    InitializeCommonEvent(0, 90015200, 9309, 12);
    InitializeCommonEvent(0, 90015200, 9310, 13);
    InitializeCommonEvent(0, 90015200, 9311, 14);
    InitializeCommonEvent(0, 90015200, 9312, 15);
    InitializeCommonEvent(0, 90015200, 9313, 16);
    InitializeCommonEvent(0, 90015201, 9315, 0, 150);
    InitializeCommonEvent(0, 90015201, 9315, 1, 151);
    InitializeCommonEvent(0, 90015201, 9315, 2, 152);
    InitializeCommonEvent(0, 90015201, 9315, 3, 153);
    InitializeCommonEvent(0, 90015201, 9315, 4, 154);
    InitializeCommonEvent(0, 90015201, 9315, 5, 155);
    InitializeCommonEvent(0, 90015201, 9315, 6, 156);
    InitializeCommonEvent(0, 90015201, 9315, 10, 150);
    InitializeCommonEvent(0, 90015201, 9315, 11, 151);
    InitializeCommonEvent(0, 90015201, 9315, 12, 152);
    InitializeCommonEvent(0, 90015201, 9315, 13, 153);
    InitializeCommonEvent(0, 90015201, 9315, 14, 154);
    InitializeCommonEvent(0, 90015201, 9315, 15, 155);
    InitializeCommonEvent(0, 90015201, 9315, 16, 156);
    InitializeCommonEvent(0, 90085027, 262347, 9200, 2);
    InitializeCommonEvent(0, 90085027, 327983, 9211, 3);
    InitializeCommonEvent(0, 90085027, 601, 9214, 6);
    InitializeCommonEvent(0, 90085027, 328281, 9214, 6);
    InitializeCommonEvent(0, 90085027, 917707, 9200, 2);
    InitializeCommonEvent(0, 90085027, 983343, 9211, 3);
    InitializeCommonEvent(0, 90085027, 655961, 9214, 6);
    InitializeCommonEvent(0, 90085027, 983641, 9214, 6);
});

$Event(50, Default, function() {
    InitializeEvent(0, 19004500, 150, 19000800);
    InitializeEvent(1, 19004500, 151, 19000810);
    InitializeEvent(2, 19004500, 152, 19000827);
    InitializeEvent(3, 19004500, 153, 19000830);
    InitializeEvent(4, 19004500, 154, 19000840);
    InitializeEvent(5, 19004500, 155, 19000850);
    InitializeEvent(6, 19004500, 156, 19000860);
    $InitializeEvent(0, 19002470);
});

$Event(19002470, Restart, function() {
    DisableNetworkSync();
    EndIf(EventFlag(19002470));
    WaitFor(EventFlag(7510) && PlayerInMap(19, 0, 0, 0));
    FadeToBlack(1, 0, true, -1);
    WaitFixedTimeSeconds(2);
    FadeToBlack(0, 0.5, false, -1);
    EndEvent();
});

$Event(19002590, Default, function() {
    WaitFor(EventFlag(7512));
    DisplayTextEffectId(4000);
    WaitFixedTimeSeconds(15);
    SetEventFlagID(7000, ON);
});

$Event(19002500, Default, function() {
    WaitFor(EventFlag(1900));
    SetSpEffect(19000800, 41110);
});

$Event(19002501, Default, function() {
    WaitFor(EventFlag(1901));
    WaitFor(cond);
    SetSpEffect(19000800, 41100);
    SetNetworkconnectedEventFlagID(19002501, ON);
});

$Event(19002502, Default, function() {
    DisableCharacter(19000400);
    DisableCharacter(19000501);
    DisableAsset(19001501);
    WaitFor(EventFlag(1902));
    EnableCharacter(19000501);
    EnableAsset(19001501);
    WaitFor(EventFlag(19008501));
    SpawnOneshotSFX(TargetEntityType.Character, 19002501, -1, 600940);
    WaitFixedTimeSeconds(1.5);
    EnableCharacter(19000400);
    EndEvent();
});

$Event(19002550, Default, function() {
    DisableCharacter(19000500);
    DisableAsset(19001500);
    DisableObjAct(19001500, 90035);
    WaitFor(EventFlag(1902));
    SpawnOneshotSFX(TargetEntityType.Asset, 19001500, 200, 1000);
    SpawnOneshotSFX(TargetEntityType.Character, 19000800, -1, 1000);
    SetSpEffect(19000800, 41105);
});

$Event(19002800, Default, function(chrEntityId) {
    EndIf(EventFlag(19000800));
    WaitFor(HPRatio(chrEntityId) <= 0);
    if (CharacterHasSpEffect(19000801, 42035)) {
        DisableCharacter(19000801);
    }
L2:
    ForceCharacterDeath(19000801, false);
    if (CharacterHasSpEffect(19000802, 42035)) {
        DisableCharacter(19000802);
    }
L3:
    ForceCharacterDeath(19000802, false);
    WaitFixedTimeSeconds(5);
    SetEventFlagID(19000800, ON);
});

$Event(19002801, Restart, function(chrEntityId, nameId) {
    if (EventFlag(19000800)) {
        DisableCharacter(chrEntityId);
        DisableCharacterCollision(chrEntityId);
        DisableCharacter(19000801);
        DisableCharacterCollision(19000801);
        DisableCharacter(19000802);
        DisableCharacterCollision(19000802);
        EndEvent();
    }
    EnableCharacter(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    EnableCharacter(19000801);
    EnableCharacterCollision(19000801);
    EnableCharacter(19000802);
    EnableCharacterCollision(19000802);
    DisableCharacterAI(chrEntityId);
    ForceAnimationPlayback(chrEntityId, 30029, true, false, false);
    DisableCharacterAI(19000801);
    ForceAnimationPlayback(19000801, 30000, true, false, false);
    DisableCharacterAI(19000802);
    ForceAnimationPlayback(19000802, 30000, true, false, false);
    WaitFor(
        InArea(10000, 19002801)
            || HasDamageType(chrEntityId, 0, DamageType.Any)
            || CharacterHasStateInfo(chrEntityId, 436)
            || CharacterHasStateInfo(chrEntityId, 2)
            || CharacterHasStateInfo(chrEntityId, 5)
            || CharacterHasStateInfo(chrEntityId, 6)
            || CharacterHasStateInfo(chrEntityId, 260));
    ForceAnimationPlayback(chrEntityId, 20029, false, false, false);
    DisableCharacterHPBarDisplay(chrEntityId);
    EnableCharacterAI(chrEntityId);
    SetNetworkUpdateRate(chrEntityId, true, CharacterUpdateFrequency.AlwaysUpdate);
    DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
    DisableCharacterHPBarDisplay(19000801);
    DisableCharacterHPBarDisplay(19000802);
    DisableCharacterHPBarDisplay(19000803);
    CreateReferredDamagePair(19000801, chrEntityId);
    CreateReferredDamagePair(19000802, chrEntityId);
    EnableCharacterAI(19000801);
    EnableCharacterAI(19000802);
    WaitFor(HPRatio(chrEntityId) <= 0.5 || EventFlag(19000999));
    ChangeWeather(Weather.Type85, -1, false);
    ForceAnimationPlayback(19006901, 100, false, false, false);
    WaitFor(ElapsedSeconds(0.7));
    ForceAnimationPlayback(19006902, 100, false, false, false);
    WaitFor(ElapsedSeconds(0.7));
    ForceAnimationPlayback(19006903, 100, false, false, false);
    ForceAnimationPlayback(19001510, 100, false, true, false);
    ForceAnimationPlayback(19001510, 110, true, false, false);
});

$Event(19002803, Restart, function(chrEntityId, spEffectId, dummypolyId) {
    WaitFor(CharacterHasSpEffect(19000800, 42030));
    WarpCharacterAndCopyFloor(chrEntityId, TargetEntityType.Character, 19000800, dummypolyId, 19000800);
    SetSpEffect(chrEntityId, spEffectId);
    WaitFixedTimeSeconds(5);
    RestartEvent();
});

$Event(19002806, Restart, function(chrEntityId) {
    WaitFor(CharacterHasSpEffect(19000800, 42031));
    SetSpEffect(chrEntityId, 42039);
    WaitFixedTimeSeconds(1);
    SetSpEffect(chrEntityId, 5950);
    WaitFixedTimeSeconds(5);
    RestartEvent();
});

$Event(19002810, Default, function(chrEntityId) {
    EndIf(EventFlag(19000810));
    WaitFor(HPRatio(chrEntityId) <= 0);
    WaitFixedTimeSeconds(5);
    SetEventFlagID(19000810, ON);
});

$Event(19002811, Restart, function(chrEntityId, nameId) {
    if (EventFlag(19000810)) {
        DisableCharacter(chrEntityId);
        DisableCharacterCollision(chrEntityId);
        EndEvent();
    }
    EnableCharacter(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    DisableCharacterAI(chrEntityId);
    ForceAnimationPlayback(chrEntityId, 30029, true, false, false);
    WaitFor(
        InArea(10000, 19002801)
            || HasDamageType(chrEntityId, 0, DamageType.Any)
            || CharacterHasStateInfo(chrEntityId, 436)
            || CharacterHasStateInfo(chrEntityId, 2)
            || CharacterHasStateInfo(chrEntityId, 5)
            || CharacterHasStateInfo(chrEntityId, 6)
            || CharacterHasStateInfo(chrEntityId, 260));
    SetBossBGM(751000, BossBGMState.Start);
    ForceAnimationPlayback(chrEntityId, 20029, false, true, false);
    DisableCharacterHPBarDisplay(chrEntityId);
    EnableCharacterAI(chrEntityId);
    SetNetworkUpdateRate(chrEntityId, true, CharacterUpdateFrequency.AlwaysUpdate);
    DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
});

$Event(19002812, Restart, function(eventFlagId, eventFlagId2, spEffectId, chrEntityId, spEffectId2, targetAmount) {
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
    SpawnMapSFX(19012400);
    SpawnMapSFX(19012401);
    SpawnMapSFX(19012402);
    SpawnMapSFX(19012403);
    SpawnMapSFX(19012404);
    SpawnMapSFX(19012405);
    SpawnMapSFX(19012406);
    SetSpEffect(0, spEffectId);
});

$Event(19002830, Default, function(chrEntityId) {
    EndIf(EventFlag(19000830));
    WaitFor(HPRatio(chrEntityId) <= 0);
    DisableGenerator(19001230);
    ForceCharacterDeath(19005830, false);
    SetEventFlagID(19000830, ON);
});

$Event(19002831, Restart, function(chrEntityId, nameId) {
    if (EventFlag(19000830)) {
        DisableCharacter(chrEntityId);
        DisableCharacterCollision(chrEntityId);
        DisableCharacter(19005830);
        DisableCharacterCollision(19005830);
        EndEvent();
    }
    PlaySE(chrEntityId, SoundType.CharacterMotion, 754009500);
    DisableCharacter(chrEntityId);
    DisableCharacterCollision(chrEntityId);
    DisableCharacterAI(chrEntityId);
    DisableCharacter(19005836);
    DisableCharacterCollision(19005836);
    DisableCharacterAI(19005836);
    ForceAnimationPlayback(chrEntityId, 30029, true, false, false);
    ForceAnimationPlayback(19005835, 30005, true, false, false);
    ForceAnimationPlayback(19005836, 30005, true, false, false);
    WaitFor(
        InArea(10000, 19002801)
            || HasDamageType(chrEntityId, 0, DamageType.Any)
            || CharacterHasStateInfo(chrEntityId, 436)
            || CharacterHasStateInfo(chrEntityId, 2)
            || CharacterHasStateInfo(chrEntityId, 5)
            || CharacterHasStateInfo(chrEntityId, 6)
            || CharacterHasStateInfo(chrEntityId, 260));
    SetBossBGM(754000, BossBGMState.Start);
    ForceAnimationPlayback(chrEntityId, 20029, false, false, false);
    DisableCharacterHPBarDisplay(chrEntityId);
    EnableCharacter(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    EnableCharacterAI(chrEntityId);
    SetNetworkUpdateRate(chrEntityId, true, CharacterUpdateFrequency.AlwaysUpdate);
    EnableCharacter(19005836);
    EnableCharacterCollision(19005836);
    EnableCharacterAI(19005836);
    WaitFixedTimeSeconds(6.5);
    DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
});

$Event(19002832, Restart, function(chrEntityId) {
    WaitFor(CharacterHasSpEffect(chrEntityId, 45610));
    if (CharacterHasSpEffect(19000200, 45685)) {
        WarpCharacterAndCopyFloor(19000200, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000200, 5906);
    } else if (CharacterHasSpEffect(19000201, 45685)) {
        WarpCharacterAndCopyFloor(19000201, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000201, 5906);
    } else if (CharacterHasSpEffect(19000202, 45685)) {
        WarpCharacterAndCopyFloor(19000202, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000202, 5906);
    } else if (CharacterHasSpEffect(19000203, 45685)) {
        WarpCharacterAndCopyFloor(19000203, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000203, 5906);
    } else if (CharacterHasSpEffect(19000204, 45685)) {
        WarpCharacterAndCopyFloor(19000204, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000204, 5906);
    } else if (CharacterHasSpEffect(19000205, 45685)) {
        WarpCharacterAndCopyFloor(19000205, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000205, 5906);
    } else if (CharacterHasSpEffect(19000206, 45685)) {
        WarpCharacterAndCopyFloor(19000206, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000206, 5906);
    } else if (CharacterHasSpEffect(19000207, 45685)) {
        WarpCharacterAndCopyFloor(19000207, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000207, 5906);
    } else if (CharacterHasSpEffect(19000208, 45685)) {
        WarpCharacterAndCopyFloor(19000208, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000208, 5906);
    } else if (CharacterHasSpEffect(19000209, 45685)) {
        WarpCharacterAndCopyFloor(19000209, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000209, 5906);
    } else if (CharacterHasSpEffect(19000210, 45685)) {
        WarpCharacterAndCopyFloor(19000210, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000210, 5906);
    } else if (CharacterHasSpEffect(19000211, 45685)) {
        WarpCharacterAndCopyFloor(19000211, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000211, 5906);
    } else if (CharacterHasSpEffect(19000212, 45685)) {
        WarpCharacterAndCopyFloor(19000212, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000212, 5906);
    } else if (CharacterHasSpEffect(19000213, 45685)) {
        WarpCharacterAndCopyFloor(19000213, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000213, 5906);
    } else if (CharacterHasSpEffect(19000214, 45685)) {
        WarpCharacterAndCopyFloor(19000214, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000214, 5906);
    } else if (CharacterHasSpEffect(19000215, 45685)) {
        WarpCharacterAndCopyFloor(19000215, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000215, 5906);
    } else if (CharacterHasSpEffect(19000216, 45685)) {
        WarpCharacterAndCopyFloor(19000216, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000216, 5906);
    } else if (CharacterHasSpEffect(19000217, 45685)) {
        WarpCharacterAndCopyFloor(19000217, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000217, 5906);
    } else if (CharacterHasSpEffect(19000218, 45685)) {
        WarpCharacterAndCopyFloor(19000218, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000218, 5906);
    } else if (CharacterHasSpEffect(19000219, 45685)) {
        WarpCharacterAndCopyFloor(19000219, TargetEntityType.Character, chrEntityId, 23, chrEntityId);
        SetSpEffect(19000219, 5906);
        Goto(L0);
    }
L0:
    WaitFixedTimeSeconds(0.1);
    RestartEvent();
});

$Event(19002833, Restart, function(chrEntityId) {
    WaitFor(CharacterHasSpEffect(chrEntityId, 45612));
    if (CharacterHasSpEffect(19000200, 45685)) {
        WarpCharacterAndCopyFloor(19000200, TargetEntityType.Character, chrEntityId, 30, chrEntityId);
        SetSpEffect(19000200, 5906);
    } else if (CharacterHasSpEffect(19000205, 45685)) {
        WarpCharacterAndCopyFloor(19000205, TargetEntityType.Character, chrEntityId, 30, chrEntityId);
        SetSpEffect(19000205, 5906);
    } else if (CharacterHasSpEffect(19000210, 45685)) {
        WarpCharacterAndCopyFloor(19000210, TargetEntityType.Character, chrEntityId, 30, chrEntityId);
        SetSpEffect(19000210, 5906);
        Goto(L0);
    }
L0:
    if (CharacterHasSpEffect(19000201, 45685)) {
        WarpCharacterAndCopyFloor(19000201, TargetEntityType.Character, chrEntityId, 31, chrEntityId);
        SetSpEffect(19000201, 5906);
    } else if (CharacterHasSpEffect(19000206, 45685)) {
        WarpCharacterAndCopyFloor(19000201, TargetEntityType.Character, chrEntityId, 31, chrEntityId);
        SetSpEffect(19000206, 5906);
    } else if (CharacterHasSpEffect(19000211, 45685)) {
        WarpCharacterAndCopyFloor(19000211, TargetEntityType.Character, chrEntityId, 31, chrEntityId);
        SetSpEffect(19000211, 5906);
        Goto(L1);
    }
L1:
    if (CharacterHasSpEffect(19000202, 45685)) {
        WarpCharacterAndCopyFloor(19000202, TargetEntityType.Character, chrEntityId, 32, chrEntityId);
        SetSpEffect(19000202, 5906);
    } else if (CharacterHasSpEffect(19000207, 45685)) {
        WarpCharacterAndCopyFloor(19000207, TargetEntityType.Character, chrEntityId, 32, chrEntityId);
        SetSpEffect(19000207, 5906);
    } else if (CharacterHasSpEffect(19000212, 45685)) {
        WarpCharacterAndCopyFloor(19000212, TargetEntityType.Character, chrEntityId, 32, chrEntityId);
        SetSpEffect(19000212, 5906);
        Goto(L2);
    }
L2:
    if (CharacterHasSpEffect(19000203, 45685)) {
        WarpCharacterAndCopyFloor(19000203, TargetEntityType.Character, chrEntityId, 34, chrEntityId);
        SetSpEffect(19000203, 5906);
    } else if (CharacterHasSpEffect(19000208, 45685)) {
        WarpCharacterAndCopyFloor(19000208, TargetEntityType.Character, chrEntityId, 34, chrEntityId);
        SetSpEffect(19000208, 5906);
    } else if (CharacterHasSpEffect(19000213, 45685)) {
        WarpCharacterAndCopyFloor(19000213, TargetEntityType.Character, chrEntityId, 34, chrEntityId);
        SetSpEffect(19000213, 5906);
        Goto(L3);
    }
L3:
    if (CharacterHasSpEffect(19000204, 45685)) {
        WarpCharacterAndCopyFloor(19000204, TargetEntityType.Character, chrEntityId, 35, chrEntityId);
        SetSpEffect(19000204, 5906);
    } else if (CharacterHasSpEffect(19000209, 45685)) {
        WarpCharacterAndCopyFloor(19000209, TargetEntityType.Character, chrEntityId, 35, chrEntityId);
        SetSpEffect(19000209, 5906);
    } else if (CharacterHasSpEffect(19000214, 45685)) {
        WarpCharacterAndCopyFloor(19000214, TargetEntityType.Character, chrEntityId, 35, chrEntityId);
        SetSpEffect(19000214, 5906);
        Goto(L4);
    }
L4:
    if (CharacterHasSpEffect(19000205, 45685)) {
        WarpCharacterAndCopyFloor(19000205, TargetEntityType.Character, chrEntityId, 36, chrEntityId);
        SetSpEffect(19000205, 5906);
    } else if (CharacterHasSpEffect(19000210, 45685)) {
        WarpCharacterAndCopyFloor(19000208, TargetEntityType.Character, chrEntityId, 36, chrEntityId);
        SetSpEffect(19000210, 5906);
    } else if (CharacterHasSpEffect(19000215, 45685)) {
        WarpCharacterAndCopyFloor(19000215, TargetEntityType.Character, chrEntityId, 36, chrEntityId);
        SetSpEffect(19000215, 5906);
        Goto(L5);
    }
L5:
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(19002834, Restart, function(chrEntityId) {
    WaitFor(CharacterHasSpEffect(chrEntityId, 45613));
    if (CharacterHasSpEffect(19000200, 45685)) {
        WarpCharacterAndCopyFloor(19000200, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000200, 5905);
    } else if (CharacterHasSpEffect(19000201, 45685)) {
        WarpCharacterAndCopyFloor(19000201, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000201, 5905);
    } else if (CharacterHasSpEffect(19000202, 45685)) {
        WarpCharacterAndCopyFloor(19000202, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000202, 5905);
    } else if (CharacterHasSpEffect(19000203, 45685)) {
        WarpCharacterAndCopyFloor(19000203, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000203, 5905);
    } else if (CharacterHasSpEffect(19000204, 45685)) {
        WarpCharacterAndCopyFloor(19000204, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000204, 5905);
    } else if (CharacterHasSpEffect(19000205, 45685)) {
        WarpCharacterAndCopyFloor(19000205, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000205, 5905);
    } else if (CharacterHasSpEffect(19000206, 45685)) {
        WarpCharacterAndCopyFloor(19000206, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000206, 5905);
    } else if (CharacterHasSpEffect(19000207, 45685)) {
        WarpCharacterAndCopyFloor(19000207, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000207, 5905);
    } else if (CharacterHasSpEffect(19000208, 45685)) {
        WarpCharacterAndCopyFloor(19000208, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000208, 5905);
    } else if (CharacterHasSpEffect(19000209, 45685)) {
        WarpCharacterAndCopyFloor(19000209, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000209, 5905);
    } else if (CharacterHasSpEffect(19000210, 45685)) {
        WarpCharacterAndCopyFloor(19000210, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000210, 5905);
    } else if (CharacterHasSpEffect(19000211, 45685)) {
        WarpCharacterAndCopyFloor(19000211, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000211, 5905);
    } else if (CharacterHasSpEffect(19000212, 45685)) {
        WarpCharacterAndCopyFloor(19000212, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000212, 5905);
    } else if (CharacterHasSpEffect(19000213, 45685)) {
        WarpCharacterAndCopyFloor(19000213, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000213, 5905);
    } else if (CharacterHasSpEffect(19000214, 45685)) {
        WarpCharacterAndCopyFloor(19000214, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000214, 5905);
    } else if (CharacterHasSpEffect(19000215, 45685)) {
        WarpCharacterAndCopyFloor(19000215, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000215, 5905);
    } else if (CharacterHasSpEffect(19000216, 45685)) {
        WarpCharacterAndCopyFloor(19000216, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000216, 5905);
    } else if (CharacterHasSpEffect(19000217, 45685)) {
        WarpCharacterAndCopyFloor(19000217, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000217, 5905);
    } else if (CharacterHasSpEffect(19000218, 45685)) {
        WarpCharacterAndCopyFloor(19000218, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000218, 5905);
    } else if (CharacterHasSpEffect(19000219, 45685)) {
        WarpCharacterAndCopyFloor(19000219, TargetEntityType.Character, chrEntityId, 221, chrEntityId);
        SetSpEffect(19000219, 5905);
        Goto(L0);
    }
L0:
    WaitFixedTimeSeconds(0.1);
    RestartEvent();
});

$Event(19002835, Restart, function(chrEntityId) {
    WaitFor(CharacterHasSpEffect(chrEntityId, 45614));
    if (CharacterHasSpEffect(19000220, 45685)) {
        WarpCharacterAndCopyFloor(19000220, TargetEntityType.Character, chrEntityId, 248, chrEntityId);
        SetSpEffect(19000220, 5907);
    } else if (CharacterHasSpEffect(19000220, 45685)) {
        WarpCharacterAndCopyFloor(19000220, TargetEntityType.Character, chrEntityId, 248, chrEntityId);
        SetSpEffect(19000220, 5907);
    } else if (CharacterHasSpEffect(19000220, 45685)) {
        WarpCharacterAndCopyFloor(19000220, TargetEntityType.Character, chrEntityId, 248, chrEntityId);
        SetSpEffect(19000220, 5907);
        Goto(L0);
    }
L0:
    WaitFixedTimeSeconds(0.1);
    RestartEvent();
});

$Event(19002840, Restart, function(chrEntityId) {
    WaitFor(CharacterHasSpEffect(chrEntityId, 45611));
    SetSpEffect(19005836, 5900);
    WaitFixedTimeSeconds(1);
    RestartEvent();
});

$Event(19002841, Restart, function() {
    DisableNetworkSync();
    WaitFor(EventFlag(7510) || PlayerInMap(19, 0, 0, 0));
    ChangeCamera(7549);
});

$Event(19002850, Default, function(chrEntityId) {
    EndIf(EventFlag(19000840));
    WaitFor(HPRatio(chrEntityId) <= 0);
    WaitFixedTimeSeconds(5);
    Unknown2003115(chrEntityId, 1010);
    SetEventFlagID(19000840, ON);
});

$Event(19002851, Restart, function(chrEntityId, nameId) {
    if (EventFlag(19000840)) {
        DisableCharacter(chrEntityId);
        DisableCharacterCollision(chrEntityId);
        EndEvent();
    }
    EnableCharacter(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    DisableCharacterAI(chrEntityId);
    ForceAnimationPlayback(chrEntityId, 20000, true, false, false);
    WaitFor(
        InArea(10000, 19002801)
            || HasDamageType(chrEntityId, 0, DamageType.Any)
            || CharacterHasStateInfo(chrEntityId, 436)
            || CharacterHasStateInfo(chrEntityId, 2)
            || CharacterHasStateInfo(chrEntityId, 5)
            || CharacterHasStateInfo(chrEntityId, 6)
            || CharacterHasStateInfo(chrEntityId, 260));
    ForceAnimationPlayback(chrEntityId, 20005, false, false, false);
    DisableCharacterHPBarDisplay(chrEntityId);
    EnableCharacterAI(chrEntityId);
    SetNetworkUpdateRate(chrEntityId, true, CharacterUpdateFrequency.AlwaysUpdate);
    DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
});

$Event(19002860, Default, function(chrEntityId) {
    EndIf(EventFlag(19000850));
    WaitFor(HPRatio(chrEntityId) <= 0);
    WaitFixedTimeSeconds(5);
    SetEventFlagID(19000850, ON);
});

$Event(19002861, Restart, function(chrEntityId, nameId) {
    if (EventFlag(19000850)) {
        DisableCharacter(chrEntityId);
        DisableCharacterCollision(chrEntityId);
        EndEvent();
    }
    EnableCharacter(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    DisableCharacterAI(chrEntityId);
    ForceAnimationPlayback(chrEntityId, 30029, true, false, false);
    WaitFor(
        InArea(10000, 19002801)
            || HasDamageType(chrEntityId, 0, DamageType.Any)
            || CharacterHasStateInfo(chrEntityId, 436)
            || CharacterHasStateInfo(chrEntityId, 2)
            || CharacterHasStateInfo(chrEntityId, 5)
            || CharacterHasStateInfo(chrEntityId, 6)
            || CharacterHasStateInfo(chrEntityId, 260));
    SetBossBGM(760000, BossBGMState.Start);
    ForceAnimationPlayback(chrEntityId, 20029, false, true, false);
    DisableCharacterHPBarDisplay(chrEntityId);
    EnableCharacterAI(chrEntityId);
    SetNetworkUpdateRate(chrEntityId, true, CharacterUpdateFrequency.AlwaysUpdate);
    DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
});

$Event(19002862, Restart, function() {
    DisableNetworkSync();
    if (IsPlayerNo(1)) {
        SetSpEffect(20000, 46330);
    }
    if (IsPlayerNo(2)) {
        SetSpEffect(20000, 46331);
    }
    if (IsPlayerNo(3)) {
        SetSpEffect(20000, 46332);
    }
    if (IsPlayerNo(4)) {
        SetSpEffect(20000, 42180);
    }
    if (IsPlayerNo(5)) {
        SetSpEffect(20000, 42181);
    }
    if (IsPlayerNo(6)) {
        SetSpEffect(20000, 42182);
    }
});

$Event(19002870, Default, function(chrEntityId) {
    EndIf(EventFlag(19000860));
    WaitFor(HPRatio(chrEntityId) <= 0);
    WaitFixedTimeSeconds(5);
    SetEventFlagID(19000860, ON);
    SetNetworkconnectedEventFlagID(7512, ON);
});

$Event(19002871, Restart, function(chrEntityId, nameId) {
    if (EventFlag(19000860)) {
        DisableCharacter(chrEntityId);
        DisableCharacterCollision(chrEntityId);
        EndEvent();
    }
    EnableCharacter(chrEntityId);
    EnableCharacterCollision(chrEntityId);
    DisableCharacterAI(chrEntityId);
    ForceAnimationPlayback(chrEntityId, 30029, true, false, false);
    SetEventPoint(19000860, 19002860, 0);
    WaitFor(
        InArea(10000, 19002801)
            || HasDamageType(chrEntityId, 0, DamageType.Any)
            || CharacterHasStateInfo(chrEntityId, 436)
            || CharacterHasStateInfo(chrEntityId, 2)
            || CharacterHasStateInfo(chrEntityId, 5)
            || CharacterHasStateInfo(chrEntityId, 6)
            || CharacterHasStateInfo(chrEntityId, 260));
    SetBossBGM(490000, BossBGMState.Start);
    ForceAnimationPlayback(chrEntityId, 20029, false, false, false);
    DisableCharacterHPBarDisplay(chrEntityId);
    EnableCharacterAI(chrEntityId);
    SetNetworkUpdateRate(chrEntityId, true, CharacterUpdateFrequency.AlwaysUpdate);
    DisplayBossHealthBar(Enabled, chrEntityId, 0, nameId);
    SetEventPoint(19000860, 19002860, 0);
    SetNetworkconnectedEventFlagID(7511, ON);
});

$Event(19002880, Restart, function(eventFlagId, bgmBossConvParamId, eventFlagId2, eventFlagId3, value, value2) {
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

$Event(19002890, Restart, function() {
    WaitFor(EventFlag(19002895));
    DisableCharacterAI(19000820);
    DisableCharacterAI(19000821);
    ForceAnimationPlayback(19000820, 20035, false, false, false);
    ForceAnimationPlayback(19000821, 20035, false, true, false);
    ForceAnimationPlayback(19000820, 30015, true, false, false);
    ForceAnimationPlayback(19000821, 30015, true, false, false);
    WaitFor(ElapsedSeconds(4));
    SetCharacterBackreadState(19000828, false);
    WarpCharacterAndCopyFloorUnknown200489(19000828, TargetEntityType.Character, 19000821, 220, 0, -1, -1);
    WaitFor(ElapsedFrames(1));
    ForceAnimationPlayback(19000828, 20010, true, true, false);
    WaitFor(ElapsedSeconds(12));
    ForceAnimationPlayback(19000820, 20036, false, false, false);
    ForceAnimationPlayback(19000821, 20036, false, false, false);
    EnableCharacterAI(19000820);
    EnableCharacterAI(19000821);
});

$Event(19002891, Restart, function() {
    WaitFor(EventFlag(19002896));
    DisableCharacterAI(19000820);
    DisableCharacterAI(19000821);
    ForceAnimationPlayback(19000820, 20035, false, false, false);
    ForceAnimationPlayback(19000821, 20035, false, true, false);
    ForceAnimationPlayback(19000820, 30015, true, false, false);
    ForceAnimationPlayback(19000821, 30015, true, false, false);
    ForceAnimationPlayback(19000828, 20011, false, true, false);
    SetCharacterBackreadState(19000828, false);
    WarpCharacterAndCopyFloorUnknown200489(19000828, TargetEntityType.Character, 19000821, 220, 0, -1, -1);
    WaitFor(ElapsedFrames(1));
    ForceAnimationPlayback(19000828, 20012, false, true, false);
    WarpCharacterAndCopyFloorUnknown200489(19000828, TargetEntityType.Character, 19000821, 220, 0, -1, -1);
    WaitFor(ElapsedFrames(1));
    ForceAnimationPlayback(19000828, 20013, false, true, false);
    ForceAnimationPlayback(19000828, 20013, true, false, false);
    ForceAnimationPlayback(19000821, 30015, true, false, false);
    WaitFor(ElapsedSeconds(8));
    ForceAnimationPlayback(19000828, 20015, false, false, false);
    ForceAnimationPlayback(19000821, 20036, false, false, false);
    EnableCharacterAI(19000820);
    EnableCharacterAI(19000821);
});

$Event(19002892, Restart, function() {
    WaitFor(EventFlag(19002897));
    DisableCharacterAI(19000820);
    DisableCharacterAI(19000821);
    ForceAnimationPlayback(19000820, 20035, false, false, false);
    ForceAnimationPlayback(19000821, 20035, false, true, false);
    ForceAnimationPlayback(19000820, 30015, true, false, false);
    ForceAnimationPlayback(19000821, 30015, true, false, false);
    ForceAnimationPlayback(19000828, 20011, false, true, false);
    SetCharacterBackreadState(19000828, false);
    WarpCharacterAndCopyFloorUnknown200489(19000828, TargetEntityType.Character, 19000820, 220, 0, -1, -1);
    WaitFor(ElapsedFrames(1));
    ForceAnimationPlayback(19000828, 20012, false, true, false);
    WarpCharacterAndCopyFloorUnknown200489(19000828, TargetEntityType.Character, 19000820, 220, 0, -1, -1);
    WaitFor(ElapsedFrames(1));
    ForceAnimationPlayback(19000828, 20013, false, true, false);
    ForceAnimationPlayback(19000828, 20013, true, false, false);
    ForceAnimationPlayback(19000820, 30015, true, false, false);
    WaitFor(ElapsedSeconds(8));
    ForceAnimationPlayback(19000828, 20015, false, false, false);
    ForceAnimationPlayback(19000820, 20036, false, false, false);
    EnableCharacterAI(19000820);
    EnableCharacterAI(19000821);
});

$Event(19004500, Restart, function(eventFlagId, chrEntityId) {
    DisableNetworkSync();
    WaitFor(
        !CharacterHasSpEffect(20000, 9731)
            && !EventFlag(115)
            && !EventFlag(eventFlagId)
            && CharacterDead(chrEntityId));
    WaitFixedTimeSeconds(10);
    DisplayNetworkconnectedPermanentBuffPopup(131);
    SetSpEffect(20000, 9731);
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
            SetNetworkconnectedEventFlagID(7512, ON);
            EndEvent();
        }
        
        WaitFixedTimeSeconds(30);
        if(!EventFlag(19002953)){
            SetNetworkconnectedEventFlagID(7512, ON);
        }
        
        EndEvent();
    }
    
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
    SetNetworkconnectedEventFlagID(7513, ON);
    WaitFixedTimeSeconds(5);
    
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
    
    SetNetworkconnectedEventFlagID(7512, ON);
    WaitFixedTimeSeconds(0.1);
    
    SetSpEffect(20000, 102121);
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
    
    SetNetworkconnectedEventFlagID(7512, ON);
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

    SetNetworkconnectedEventFlagID(7512, ON);
    
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
