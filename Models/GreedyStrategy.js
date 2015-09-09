(function () {
	angular.module('fillerApp').factory('GreedyStrategy', greedyStrategyFactory);

	function greedyStrategyFactory(Move) {
		function GreedyStrategy() {

		}

		GreedyStrategy.prototype.findBestMove = function (board, isTopLeftCorner) {
			var bestMove = new Move();
			for (var i = 1; i <= board.colorsCount; i++) {
				if (board.getFirstTile() == i ||
					board.getLastTile() == i)
					continue;
				var move = board.calcMove(i, isTopLeftCorner);
				if (move.tilesCount > bestMove.tilesCount) {
					bestMove = move;
				}
			}
			return bestMove;
		}

		return GreedyStrategy;
	}
})();