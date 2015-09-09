(function () {
	angular.module("fillerApp", []).controller("DemoCtrl", DemoController);

	function DemoController($scope, Board, GreedyStrategy, $timeout) {
		$scope.boardSize = 15;
		$scope.boardColorsCount = 6;
		// Potentially, we can change computer strategy to more sophisticated algorithms.
		$scope.computerStrategy = new GreedyStrategy();

		$scope.restart = function () {
			$scope.isFirstPlayer = true;
			$scope.firstPlayerScore = 0;
			$scope.secondPlayerScore = 0;
			$scope.board.reset();
			$scope.gameIsOver = false;
		}
		$scope.$watch("boardSize", function (newSize) {
			$scope.board = new Board(newSize, $scope.boardColorsCount);
			$scope.restart();
		});

		$scope.$watch("boardColorsCount", function (newColorsCount) {
			$scope.board = new Board($scope.boardSize, newColorsCount);
			$scope.restart();
		});

		$scope.makeMove = function (color) {
			if ($scope.board.getFirstTile() == color || $scope.board.getLastTile() == color
			  || !$scope.isFirstPlayer || $scope.gameIsOver)
				return;
			var move = $scope.board.calcMove(color, $scope.isFirstPlayer);
			$scope.board.applyMove(move);
			$scope.isFirstPlayer = false;
			$scope.firstPlayerScore = move.tilesCount;
			if ($scope.firstPlayerScore >= $scope.boardSize * $scope.boardSize / 2) {
				$scope.gameIsOver = true;
				return;
			}
			$timeout(function () {
				computerMove();
				// Check that there are moves left for the first player using current 
				// computer strategy.
				var bestMove = $scope.computerStrategy.findBestMove($scope.board, true);
				if (bestMove.tilesCount <= $scope.firstPlayerScore) {
					$scope.gameIsOver = true;
					return;
				}
			}, 500);
		}

		function computerMove() {
			var bestMove = $scope.computerStrategy.findBestMove($scope.board, false);
			if (bestMove.tilesCount <= $scope.secondPlayerScore) {
				$scope.gameIsOver = true;
				return;
			}
			$scope.board.applyMove(bestMove);
			$scope.isFirstPlayer = true;
			$scope.secondPlayerScore = bestMove.tilesCount;
			if ($scope.secondPlayerScore >= $scope.boardSize * $scope.boardSize / 2)
				$scope.gameIsOver = true;
		}
	}
})();