puts ARGF.reduce(0) {|sum, line| sum + ((line.to_i / 3).floor - 2) }
