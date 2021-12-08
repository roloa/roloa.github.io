
# 画像のファイル名リストのjsファイルを出力する

import glob

filename_list = glob.glob('./img/*.png')
print()
print('export class ImgFileName {')
print('  static FILE_NAME_LIST = [')
for filename in filename_list:
    print( "  '"+filename+"'," )
print('  ]')
print('}\n')
