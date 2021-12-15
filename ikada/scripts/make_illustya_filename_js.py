
# いらすとや素材のファイル名リストのjsファイルを出力する

import glob

filename_list = glob.glob('./img/illustya/*.png')
print()
print('export class Illustya {')
print('  static FILE_NAME_LIST = [')
for filename in filename_list:
    print( "  '"+filename+"'," )
print('  ]')
print('}\n')
