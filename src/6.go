package main

import (
  "bufio"
  "fmt"
  "os"
  "strings"
)

func countStepsToRoot(childList []string, branch []string, flat map[string][]string) (int64, []string) {
  var count int64 = 0;
  for _, node := range childList {
    count++;
    if _, ok := flat[node]; !ok {
      return count, branch
    }
    c, b := countStepsToRoot(flat[node], append([]string{node}, branch...), flat);
    count += c
    branch = b
  }
  return count, branch
}

func main() {
  flat := make(map[string][]string);

  // read file
  file, err := os.Open("6.txt")
  if err != nil {
    panic(err)
  }
  defer file.Close()

  scanner := bufio.NewScanner(file)

  if err := scanner.Err(); err != nil {
    panic(err)
  }

  for scanner.Scan() {
    // read lines
    var txt = strings.Split(scanner.Text(), ")");
    if _, ok := flat[txt[1]]; !ok {
      flat[txt[1]] = []string{};
    }
    flat[txt[1]] = append(flat[txt[1]], txt[0])
  }

  // fmt.Println("flat: ", flat)

  var total int64 = 0;
  var sanToRoot []string;
  var youToRoot []string;
  for parent, v := range flat {
    t, tree := countStepsToRoot(v, []string{}, flat);
    total += t
    if parent == "SAN" {
      sanToRoot = tree;
    }
    if parent == "YOU" {
      youToRoot = tree;
    }
  }
  for {
    if sanToRoot[0] == youToRoot[0] {
      sanToRoot = sanToRoot[1:]
      youToRoot = youToRoot[1:]
    } else {
      break
    }
  }
  fmt.Println("total", total)
  fmt.Println("santa", len(sanToRoot) + len(youToRoot))
}
