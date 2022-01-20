
#

import glob

filename_list = glob.glob('./src/ship_block/*.js')
classname_list = []

for filename in filename_list:
    classname = filename.replace('./src/ship_block/','').replace('.js','')
    classname_list.append( classname )

print()
for classname in classname_list:
    print( "import {%s} from './ship_block/%s.js'" % ( classname, classname ) )

print()

print("export class BlockInstanceMaker {")
print("    constructor( game ){")
print("        this.game = game;")
print("    }")
print("    make_instance( block_data ){")
print("")
print("        if( block_data == null ){")
print("            return null;")

for classname in classname_list:
    print("        } else if( block_data.class_name == '%s' ){" % ( classname ))
    print("            return new %s( this.game );"  % ( classname ))

print("        }")
print("        return new ShipBlock( this.game );")
print("    }")
print("}")

print()
