const cube = x => {
    let c = Math.pow(x,3)
    return c
  }
  
  [1, 2, 3, 4, 5, 6, 7].map(cube).forEach(cubedValue => console.log(cubedValue));
