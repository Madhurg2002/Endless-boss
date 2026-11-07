#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>
typedef unsigned char byte_t;
int Kraken_Decompress(const byte_t *src, size_t src_len, byte_t *dst, size_t dst_len);

static uint32_t rd32(const unsigned char *p) { return ((uint32_t)p[0]<<24) | (p[1]<<16) | (p[2]<<8) | p[3]; }

int main(int argc, char **argv) {
    if (argc < 3) { fprintf(stderr, "usage: dcxkrak in.dcx out.raw\n"); return 2; }
    FILE *f = fopen(argv[1], "rb");
    if (!f) { perror("open"); return 2; }
    fseek(f, 0, SEEK_END); long n = ftell(f); fseek(f, 0, SEEK_SET);
    unsigned char *buf = (unsigned char*)malloc(n);
    if (fread(buf, 1, n, f) != (size_t)n) { fprintf(stderr, "short read\n"); return 2; }
    fclose(f);
    if (memcmp(buf, "DCX\0", 4) != 0) { fprintf(stderr, "not a DCX\n"); return 3; }
    if (memcmp(buf + 0x24, "DCP\0", 4) != 0) { fprintf(stderr, "no DCP\n"); return 3; }
    if (memcmp(buf + 0x28, "KRAK", 4) != 0) { fprintf(stderr, "not KRAK (%.4s)\n", buf + 0x28); return 3; }
    uint32_t usize = rd32(buf + 0x1C), csize = rd32(buf + 0x20);
    size_t dca = rd32(buf + 0x10), off = rd32(buf + 0x14);
    if (memcmp(buf + dca, "DCA\0", 4) != 0) { fprintf(stderr, "no DCA marker at 0x%zx\n", dca); return 3; }
    if (off + csize > (size_t)n) { fprintf(stderr, "truncated stream\n"); return 3; }
    unsigned char *out = (unsigned char*)malloc(usize);
    int got = Kraken_Decompress(buf + off, csize, out, usize);
    if (got < 0 || (uint32_t)got != usize) {
        fprintf(stderr, "kraken failed: got %d of %u\n", got, usize);
        return 4;
    }
    FILE *o = fopen(argv[2], "wb");
    fwrite(out, 1, usize, o); fclose(o);
    fprintf(stderr, "ok %u bytes\n", usize);
    return 0;
}
