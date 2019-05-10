import * as vscode from 'vscode';

let coffeeStatus: vscode.StatusBarItem;
let coffeeDrank = 0;
const update = 'Java installation expired. Please install more coffee!';
let messages = [
	'Keep going! ',
	'Another one bites the dust!',
	'You can do it! -Coffee',
	'There is no life without water. Becasue water is needed to make coffee!',
	'Coffee is my favorite way to trick myself into doing stuff.',
	'Behind every successful person is a substantial amount of coffee.',
	'So many idea\'s, so latte time.',
	'Good idea\'s start with coffee.',
	'I turn coffee into code.'
]

export function activate(context: vscode.ExtensionContext) {

	const coffeeCount = 'coffee.getCoffeeCount';
	const coffeeAdd = 'coffee.addCoffeeCount';
	const coffeeRefresh = 'coffee.refresh';
	const coffeeUpdate = 'coffee.coffeeUpdate';
	const coffeeReset = 'coffee.coffeeReset';
	const coffeeCan = context.workspaceState.get("consumed", coffeeDrank);
	coffeeDrank = coffeeCan;

	//
	//Register commands
	//
	context.subscriptions.push(vscode.commands.registerCommand(coffeeAdd, () => {
		addCoffeeCount();
		let i = randMessage();
		context.workspaceState.update("Consumed", getCoffeeConsumed());
		updateStatusbarItem();
		refreshTreeView();
		vscode.window.showInformationMessage(messages[i]);
	}));

	context.subscriptions.push(vscode.commands.registerCommand(coffeeCount, () =>{
		let i = randMessage();
		vscode.window.showInformationMessage(getCoffeeConsumed() + ' consumed.');
	}));

	context.subscriptions.push(vscode.commands.registerCommand(coffeeReset, () => {
		coffeeDrank = 0;
		context.workspaceState.update("Consumed", getCoffeeConsumed());
		updateStatusbarItem();
		vscode.window.showInformationMessage('Coffee count has been reset.');
		
	}));

	context.subscriptions.push(vscode.commands.registerCommand(coffeeUpdate, () =>{
		vscode.window.showInformationMessage(update);
	}));

	context.subscriptions.push(vscode.commands.registerCommand(coffeeRefresh, () => {
// console.log('refresh hit!');
		refreshTreeView();
	}))

	//
	//create view container
	//
	vscode.window.createTreeView('coffeeView', {
		treeDataProvider: CoffeeProvider()
	});

	function CoffeeProvider(): vscode.TreeDataProvider<{}> {  
		
		
		return{
			getChildren,
			getTreeItem        
		}
	}
	
	async function getChildren(element: string): Promise<string[]> {
// console.log(coffeeDrank);
		return [			
			coffeeDrank.toString()			
		];
	}
	
	function getTreeItem(item: string): vscode.TreeItem {

		return{
			
			id: 'consumed',
			collapsibleState: void 0,
			label:'Consumed - '+ coffeeDrank.toString(),
			tooltip: 'Coffee\'s consumed'
			
		}
	}

	function refreshTreeView(){
		let obj = getTreeItem('consumed');
		obj.label = 'Consumed - '+ coffeeDrank.toString();
		obj.contextValue = coffeeDrank.toString();

		vscode.window.createTreeView('coffeeView', {
			treeDataProvider: CoffeeProvider()
		});

// console.log(obj);
	}

	//
	//create the statusbar item
	//
	coffeeStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	coffeeStatus.color = '#bb8';

	coffeeStatus.command = coffeeAdd;
	context.subscriptions.push(coffeeStatus);

	updateStatusbarItem();
}

function getCoffeeConsumed(){	
	return coffeeDrank;
}

function addCoffeeCount():void{
	coffeeDrank++;
	coffeeTimer();
}

function coffeeTimer(){
	let t = 1200000;	
	setTimeout(updateMsg, t);
}
function updateMsg(){
	vscode.window.showInformationMessage(update);
}

function randMessage(){
	return Math.floor((Math.random() * messages.length) + 1);
}

function updateStatusbarItem()
{
	let n = getCoffeeConsumed();

	if(n == 1)
	{
		coffeeStatus.text = '$(star) '+ n +' coffee consumed!';
		vscode.window.showInformationMessage('Java installation processing...');
		coffeeStatus.show();
	}
	else if( n > 1 && n < 10)
	{
		coffeeStatus.text = '$(star) '+ n +' coffee\'s consumed!';
		coffeeStatus.show();
	}
	else if(n >= 10)
	{
		coffeeStatus.text = '$(rocket) '+ n +' coffee\'s consumed!';
		coffeeStatus.show();
	}
	else
	{
		coffeeStatus.text = '$(star) Need Coffee!'
		coffeeStatus.show();
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}