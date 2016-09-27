describe('boss turn', function() {
	beforeEach(function(){startGame()})

  it('test ms', function() {
    expect(playerTurn(1, 0)).toEqual(99);
  });
  
});
