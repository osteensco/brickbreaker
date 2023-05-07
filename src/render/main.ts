import { mainMenu } from "../menu/mainMenu";


// renderer process





const menu = new mainMenu()
console.log("render success");

// @ts-expect-error
console.log(API.test.stuff);

// @ts-expect-error
API.listeners.onWindowSize((winSize) => {
	
	console.log(`Window size: ${winSize.width}x${winSize.height}`);
});
// @ts-expect-error
API.listeners.onStart(() => {
	console.log('listener onStart method called');
	console.log('app started');
	// return menu.create
});


// @ts-expect-error
API.menu.load()







