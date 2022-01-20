
#

import glob

folder_list = []

for folder_path in glob.glob('./src/tool_item/d_*'):
    folder_list.append( folder_path.replace( './src/tool_item/','' ) )

classname_list = []
path_list = []

filename_list = glob.glob('./src/tool_item/**/*.js', recursive=True)


for filename in filename_list:
    path = filename.replace('./src/tool_item/','').replace('.js','')
    path_list.append( path )

    classname = path
    for folder_name in folder_list:
        classname = classname.replace( folder_name + '/' ,'')

    classname_list.append( classname )

print()
for i in range(len(classname_list)):
    print( "import {%s} from './tool_item/%s.js'" % ( classname_list[i], path_list[i] ) )

print()

print("export class ItemInstanceMaker {")
print("    constructor( game ){")
print("        this.game = game;")
print("    }")
print("    make_instance( item_data ){")
print("")
print("        if( item_data == null ){")
print("            return null;")

for classname in classname_list:
    print("        } else if( item_data.class_name == '%s' ){" % ( classname ))
    print("            return new %s( this.game );"  % ( classname ))

print("        }")
print("        return new ToolItem( this.game );")
print("    }")
print("}")

print()
