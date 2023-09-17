
// renderer process




// @ts-expect-error
APP.rendererSend.appLoaded()
// @ts-expect-error
APP.listeners.onWindowSize((winSize) => {
    // @ts-expect-error
    APP.game.windowResize()
	console.log(`Window size: ${winSize.width}x${winSize.height}`);
});
// @ts-expect-error
APP.listeners.onStart(() => {
	// @ts-expect-error
	APP.menu.loadMain();

});
// @ts-expect-error
APP.listeners.onGameLoad(() => {
	
	// @ts-expect-error
	APP.game.loadCanvas();
	// @ts-expect-error
	APP.game.init();
	
});
// @ts-expect-error
APP.listeners.onScoresNav(() => {
	// @ts-expect-error
	APP.menu.loadScores();

});
// @ts-expect-error
APP.listeners.onSettingsNav(() => {
	// @ts-expect-error
	APP.menu.loadSettings();

});

// @ts-expect-error
APP.listeners.onCurrentSettingsLoad();

// @ts-expect-error
APP.listeners.onApplyDefaultSettings();

// @ts-expect-error
APP.listeners.onGetHighScores();

