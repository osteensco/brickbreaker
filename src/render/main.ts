
// renderer process





// const menu = new mainMenu()
console.log("renderer script loaded");
// @ts-expect-error
API.rendererSend.loaded()
// @ts-expect-error
API.listeners.onWindowSize((winSize) => {
	console.log(`Window size: ${winSize.width}x${winSize.height}`);
});
// @ts-expect-error
API.listeners.onStart(() => {
	// @ts-expect-error
	API.menu.load();
	// @ts-expect-error
	API.game.spawnPaddle();
});
// @ts-expect-error
API.listeners.onGameLoad(() => {
	// @ts-expect-error
	API.game.load();
	// // @ts-expect-error
	// player = API.game.spawnPaddle();

	// @ts-expect-error
	API.game.draw();
	
});







