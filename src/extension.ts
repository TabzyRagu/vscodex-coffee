// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
let coffeeStatus: vscode.StatusBarItem;
let coffeeDrank = 0;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		//console.log('Congratulations, your extension "coffee-status" is now active!');
	const coffeeCount = 'coffee.getCoffeeCount';
	const coffeeAdd = 'coffee.addCoffeeCount';	
	const coffeeCan = context.workspaceState.get("consumed", coffeeDrank);
		//console.log('datastore: '+ coffeeCan);
	coffeeDrank = coffeeCan;

	context.subscriptions.push(vscode.commands.registerCommand(coffeeAdd, () => {
		addCoffeeCount();
		context.workspaceState.update("consumed", coffeeDrank);
		updateStatusbarItem();
		vscode.window.showInformationMessage('Keep going! '+ coffeeCan +' coffee(s) consumed so far!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand(coffeeCount, () =>{
		vscode.window.showInformationMessage('Keep going! '+ coffeeCan +' coffee(s) consumed so far!');
	}));

	//create the statusbar item
	coffeeStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	coffeeStatus.color = '#bb8';

	coffeeStatus.command = coffeeAdd;
	context.subscriptions.push(coffeeStatus);

	//Update statusbar item
	updateStatusbarItem();
}

function getCoffeeConsumed(){	
	return coffeeDrank;
}

function addCoffeeCount():void{
	coffeeDrank++;	
}

function updateStatusbarItem()
{
	let n = getCoffeeConsumed();
	if( n > 0 )
	{
		coffeeStatus.text = '$(star) '+ n +' coffee(s) consumed!';
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