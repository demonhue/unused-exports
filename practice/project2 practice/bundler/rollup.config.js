export default {
    input: 'src/main.js',
    output: [{
        dir: 'build/',
        format: 'cjs',
        preserveModules: true,
    },
    {
        file: 'dist/bundle-b2.js',
        format: 'es'
    }]
}

//target a single file's variables
//eslint ka no used var implementation