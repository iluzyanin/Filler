(function () {
	angular.module('fillerApp').factory('Move', moveFactory);

	function moveFactory() {
		function Move(tilesCount, color, visitedTiles) {
			this.tilesCount = tilesCount || 0;
			this.visitedTiles = visitedTiles;
			this.color = color;
		}

		return Move;
	}
})();