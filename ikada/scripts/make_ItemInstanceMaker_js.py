
#

import glob

filename_list = glob.glob('./js/tool_item/*.js')
classname_list = []

for filename in filename_list:
    classname = filename.replace('./js/tool_item/','').replace('.js','')
    classname_list.append( classname )

print()
for classname in classname_list:
    print( "import {%s} from './tool_item/%s.js'" % ( classname, classname ) )

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
