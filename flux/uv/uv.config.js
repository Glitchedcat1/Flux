self.__uv$config = {
    prefix: '/flux/go/',
    bare:'https://bare2.mysticmath.workers.dev/', //this is the line you will change to your server
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/flux/uv/uv.handler.js',
    bundle: '/flux/uv/uv.bundle.js',
    config: '/flux/uv/uv.config.js',
    sw: '/flux/uv/uv.sw.js',
};
