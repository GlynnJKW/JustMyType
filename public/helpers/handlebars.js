function hbsHelpers(hbs) {
  return hbs.create({
    helpers: { // This was missing
      isNth: function(index_count, mod, block) {
        if(parseInt(index_count)%(mod)=== 0){
          return block.fn(this);
        }

      // More helpers...
      }
    }

  });
}

module.exports = hbsHelpers;
