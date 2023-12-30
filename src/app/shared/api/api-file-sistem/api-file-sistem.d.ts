type IFileList = {
  type: string;
  title: string;
  description: string;
  children?: IFileList[];
}

export {IFileList}


