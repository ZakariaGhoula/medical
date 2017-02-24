module.exports = function(grunt) {


    grunt.loadNpmTasks('grunt-symlink');

    //--- schema
    /*
     web
     |
     └── LearningBundle
     └── backend

     └── public
     ├── css
     │   ├── frontend-home.css
     |   └── frontend-article.css
     ├── images
     │     └── no-photo.gif
     └── js
     ├── frontend-home.js
     └── frontend-article.js


     */




    // Création du répertoire d'image pour l'application s'il n'existe pas.
    //  mdkir images folder if not exist
    grunt.file.mkdir('../public/images/');
    grunt.file.mkdir('../public/js/');
    grunt.file.mkdir('../public/css/');
    grunt.file.mkdir('../public/assets/');
    grunt.file.mkdir('../public/css');
    grunt.file.mkdir('../public/js');
    grunt.file.mkdir('../public/fonts');
    // Création du répertoire d'image pour l'application s'il n'existe pas.
    // Configuration du projet
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        //-- verify js files
        jshint:{
            all:['../../core/template/js']
        },
        //-- copy all file needed
        bowercopy: {
            options: {
                srcPrefix: 'libs',
                destPrefix: 'assets'
            },
            scripts: {
                files: {
                    'js/jquery.js': 'jquery/dist/jquery.js',
                    'js/bootstrap.js': 'bootstrap/dist/js/bootstrap.js'
                }
            },
            stylesheets: {
                files: {
                    'css/bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
                    'css/font-awesome.css': 'font-awesome/css/font-awesome.css'
                }
            },

            fonts: {
                files: {
                    'fonts/fa': 'font-awesome/fonts'
                }
            }

        },
        //--- concatenation of script js
        concat: {
            js: {

                files:[
                    //-- noel2015
                    {
                        src: [
                            'assets/js/jquery.js',
                            "assets/js/bootstrap.js",
                            "assets/js/home.js"
                            //-- il manque ga + cookies
                        ],
                        dest: 'assets/js/concat/dist-zetagamma.js'
                    }

                ]
            },
            css: {
                files:[
                    //-- noel2015
                    {
                        src: [
                            'assets/css/bootstrap.css',
                            "assets/css/font-awesome.css",
                            "assets/css/react-datepicker.min.css",
                            "assets/css/react-big-calendar.css",
                            "assets/css/zetagamma.css",
                        ],
                        dest: 'assets/css/concat/dist-zetagamma.css'
                    }

                ]


            }


        },//end of concat
        //--- compression of scripts
        uglify: {
            home: {
                files: {
                    '../public/js/zetagamma.js': ['assets/js/concat/dist-zetagamma.js']
                }
            }

        },
        cssmin: {
            home: {
                files: {
                    '../public/css/zetagamma.css': ['assets/css/concat/dist-zetagamma.css']
                }
            }

        },//end of cssmin
        watch: {
            css: {
                files: ['assets/css/*.css'],
                tasks: ['css']
            },
            javascript: {
                files: ['assets/js/*.js'],
                tasks: ['javascript']
            }
            ,compass: {
                files: ['assets/sass/*.scss'],
                tasks: ['compass']
            }
        }, //-- mv files
        copy: {
            fonts : {
                files:[
                    //---- fa
                    {expand: true, cwd: 'assets/fonts/fa/', src: ['**/*'], dest: '../public/fonts/',filter: 'isFile'}


                ]
            }
        },//-- compass
        compass: {                  // Task
            dist: {                   // Target
                options: {              // Target options
                    sassDir: 'assets/sass',
                    cssDir: 'assets/css',
                    environment: 'dev'
                }
            }
        },
        less: {
            dist: {
                options: {
                    paths: ["assets/less/ui_components"]
                },
                files: {
                    "assets/less/input.css": "assets/less/application.less"
                }
            }
        }


    });
// Default task(s).
    // Default task(s).

    grunt.registerTask('default', ['javascript','css']);
    grunt.registerTask('javascript', ['bowercopy','concat:js','uglify']);
    grunt.registerTask('css', ['bowercopy','concat:css','cssmin','cp']);
    grunt.registerTask('cp', ['copy']);
    grunt.registerTask('less', ['less']);
    grunt.registerTask('bowercopy', ['bowercopy']);

    grunt.registerTask('styles', ['sass']);
    grunt.registerTask('verifyjs', ['jshint:all']);
    grunt.registerTask('images', ['imagemin']);


    grunt.registerTask('deploy', ['assets:install', 'default']);

    //-- call plugins to use
    require('load-grunt-tasks')(grunt);
};