
// renderer process



console.log("renderer script loaded");
// @ts-expect-error
APP.rendererSend.loaded()
// @ts-expect-error
APP.listeners.onWindowSize((winSize) => {
    // @ts-expect-error
    APP.game.windowResize()
	console.log(`Window size: ${winSize.width}x${winSize.height}`);
});
// @ts-expect-error
APP.listeners.onStart(() => {
	// @ts-expect-error
	APP.menu.load();

});
// @ts-expect-error
APP.listeners.onGameLoad(() => {
	
	// @ts-expect-error
	APP.game.loadCanvas();
	// @ts-expect-error
	APP.game.init();
	
	
	
});







