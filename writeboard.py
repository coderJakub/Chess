for i in range(8):
    board = open("board.txt", "a")
    board.write("\n")
    board.close()
    for j in range(8):
        new = '["'+str(i)+str(j)+'", null]'
        board = open("board.txt", "a")
        board.write(new)
        board.close()
print("done")
