
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default [
  {
    input: 'web_src/index.js',
    output: {
      name: 'HarbourReactNativeRunner',
      file: 'dist/harbour-react-native-runner.min.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins: [
      babel({ exclude: 'node_modules/**', }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      resolve({ browser: true, }),
      commonjs(),
      uglify(),
    ],
  },
]
