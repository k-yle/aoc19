lower = 183564
upper = 657474

count = 0
for i in range(lower, upper):
    c = [int(char) for char in str(i)]
    goingUp = [
        (c[i] <= c[i+1] if i < 5 else True) for (i, digit) in enumerate(c)
    ]
    repeats = [
        i < 5 and c[i] == c[i+1] for (i, digit) in enumerate(c)
    ]
    if all(goingUp) and any(repeats):
        count += 1

print(count)
