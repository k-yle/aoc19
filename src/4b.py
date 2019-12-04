lower = 183564
upper = 657474

count = 0

def Repeats(word):
    count = 1
    length = []
    if len(word) > 1:
        for i in range(1, len(word)):
            if word[i-1] == word[i]:
                count += 1
            else:
                length.append([word[i-1], count])
                count = 1
        length.append([word[i], count])
    else:
        length.append([word[0], count])
    return len(list(filter(lambda x: x[1] == 2, length))) >= 1


for i in range(lower, upper):
    c = [int(char) for char in str(i)]
    goingUp = [
        (c[i] <= c[i+1] if i < 5 else True) for (i, digit) in enumerate(c)
    ]
    anyRepeats = Repeats(c)
    if all(goingUp) and anyRepeats:
        count += 1

print(count)
# 670 is too low
