total = 0
d = ->(n) { (n / 3).floor -2 }

ARGF.each{|line|
  x = d.(line.to_i)
  while x > 0 do
    total += x;
    x = d.(x)
  end
}
puts total
