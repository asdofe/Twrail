import path from 'path';

const config = {
    entry: {
        js: './src/app-client.jsx',
    },
    output: {
        path: path.join(__dirname, 'src', 'public', 'javascripts'),
        filename: 'bundle.js'
    },
    resolve:{
        extensions: ['.jsx', '.js']
    }, 
  module: {
    rules: [
      {
        test: path.join(__dirname, "src"), 
      
        use: {
        loader: 'babel-loader',
          options: 'cacheDirectory=.babel_cache',
         }

         
        },


      {
        loader: 'eslint-loader',
         options: {
	        resovle: {
        		extensions: ['.js', '.jsx']
	             }

	      }
	},
      
    ]},
};

export default config;

