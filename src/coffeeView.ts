// import * as vscode from 'vscode';

// export default function CoffeeProvider(): vscode.TreeDataProvider<{}>{

//     return{
//         getTreeItem,
//         getChildren,
//         onDidChangeTreeData,
//     }
// }

// async function getChildren(element?: MyCoffee): Promise<MyCoffee[]> {
//     const children = element
//     ? await getSubListOfElement(element)
//     : await getParentList()

//     return children
// }

// function getTreeItem(item: MyCoffee): vscode.TreeItem {

//     return{
//         id: '${item.id}',
//         collapsibleState: void 0,
//         label: '${item.name}',
//         tooltip: '${item.description}'
//     }
// }