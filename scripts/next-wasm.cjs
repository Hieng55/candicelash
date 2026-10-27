// Windows Application Control can block Next.js's native SWC `.node` binary.
// Force the official WebAssembly binding before Next.js initializes SWC.
process.env.NEXT_TEST_WASM = "1";

require("next/dist/bin/next");
