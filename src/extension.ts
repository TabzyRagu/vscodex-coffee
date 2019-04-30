// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
//import CoffeeProvider from './coffeeView';
//import { Coffee, CoffeeDataProvider, CoffeeNode} from './coffeeView'
let coffeeStatus: vscode.StatusBarItem;
let coffeeDrank = 0;
const update = 'Java installation expired. Please install more coffee!';

export function activate(context: vscode.ExtensionContext) {

	const coffeeCount = 'coffee.getCoffeeCount';
	const coffeeAdd = 'coffee.addCoffeeCount';
	const coffeeRefresh = 'coffeeView.refresh';
	const coffeeUpdate = 'coffee.coffeeUpdate';
	const coffeeReset = 'coffee.coffeeReset';
	const coffeeCan = context.workspaceState.get("consumed", coffeeDrank);
		//console.log(coffeeCan);
	coffeeDrank = coffeeCan;

	//
	//Register commands
	//
	context.subscriptions.push(vscode.commands.registerCommand(coffeeAdd, () => {
		addCoffeeCount();
		context.workspaceState.update("Consumed", coffeeDrank);
		updateStatusbarItem();
		vscode.window.showInformationMessage('Keep going! '+ coffeeDrank +' coffee(s) consumed so far!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand(coffeeCount, () =>{
		vscode.window.showInformationMessage('Keep going! '+ coffeeDrank +' coffee(s) consumed so far!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand(coffeeReset, () => {
		coffeeDrank = 0;
		context.workspaceState.update("Consumed", coffeeDrank);
		updateStatusbarItem();
		vscode.window.showInformationMessage('Coffee count has been reset.');
		
	}));

	context.subscriptions.push(vscode.commands.registerCommand(coffeeUpdate, () =>{
		vscode.window.showInformationMessage(update);
	}));

	context.subscriptions.push(vscode.commands.registerCommand(coffeeRefresh, () => {
		console.log('refresh hit!');

	}))

	//
	//create view container
	//
	// vscode.window.createTreeView('coffee-status', {
	// 	treeDataProvider: new CoffeeProvider()
	// });


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
	let t = 120000;	
	setTimeout(updateMsg, t);
}
function updateMsg(){
	vscode.window.showInformationMessage(update);
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