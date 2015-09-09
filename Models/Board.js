(function () {
	angular.module('fillerApp').factory('Board', boardFactory);

	function boardFactory(Move) {
		function Board(size, colorsCount) {
			this.size = +size;
			this.colorsCount = +colorsCount;
			this.tiles = create2dArray(this.size);
		}

		Board.prototype.getFirstTile = function () {
			return this.tiles[0][0];
		}
		Board.prototype.getLastTile = function () {
			return this.tiles[this.size - 1][this.size - 1];
		}

		Board.prototype.reset = function () {
			for (var i = 0; i < this.size; i++) {
				for (j = 0; j < this.size; j++) {
					this.tiles[i][j] = getRandomArbitrary(1, this.colorsCount);
				}
			}
			var lastColor = this.tiles[this.size - 1][this.size - 1];
			if (this.tiles[0][0] == lastColor) {
				this.tiles[this.size - 1][this.size - 1] =
					lastColor < this.colorsCount - 1 ? lastColor + 1 : lastColor - 1;
			}
		}

		Board.prototype.calcMove = function (color, isTopLeftCorner) {
			var tilesCount = 0;
			var visitedTiles = create2dArray(this.size);
			if (isTopLeftCorner)
				findNextTile.call(this, 0, 0, color);
			else
				findNextTile.call(this, this.size - 1, this.size - 1, color);
			return new Move(tilesCount, color, visitedTiles);

			function findNextTile(x, y, color) {
				tilesCount++;
				visitedTiles[x][y] = true;
				if (x < this.size - 1 && !visitedTiles[x + 1][y] &&
					(this.tiles[x + 1][y] == color || this.tiles[x + 1][y] == this.tiles[x][y]))
					findNextTile.call(this, x + 1, y, color);
				if (x > 0 && !visitedTiles[x - 1][y] &&
					(this.tiles[x - 1][y] == color || this.tiles[x - 1][y] == this.tiles[x][y]))
					findNextTile.call(this, x - 1, y, color);
				if (y < this.size - 1 && !visitedTiles[x][y + 1] &&
					(this.tiles[x][y + 1] == color || this.tiles[x][y + 1] == this.tiles[x][y]))
					findNextTile.call(this, x, y + 1, color);
				if (y > 0 && !visitedTiles[x][y - 1] &&
					(this.tiles[x][y - 1] == color || this.tiles[x][y - 1] == this.tiles[x][y]))
					findNextTile.call(this, x, y - 1, color);
			}
		}

		Board.prototype.applyMove = function (move) {
			for (var i = 0; i < this.tiles.length; i++)
				for (var j = 0; j < this.tiles.length; j++) {
					if (move.visitedTiles[i][j])
						this.tiles[i][j] = move.color;
				}
		}

		function getRandomArbitrary(min, max) {
			return Math.round(Math.random() * (max - min) + min);
		}

		function create2dArray(size) {
			var items = new Array(size);
			for (var i = 0; i < size; i++)
				items[i] = new Array(size);
			return items;
		}

		return Board;
	}
})();