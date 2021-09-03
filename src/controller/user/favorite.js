const Favorite = require("../../models/favorite");

exports.addItemTofavorite = (req, res) => {

    Favorite.findOne({ user: req.user._id })
    .exec((error, favorite) => {

        if (error) return res.status(400).json({ error });
        if (favorite) {
          // if favorite already exists then update by quantity
              // res.status(200).json({ message:cart});
              const product = req.body.favoriteItems.product
              const item = favorite.favoriteItems.find(c => c.product == product);
              let condition, update;

          if(item){

            condition = {"user" : req.user._id ,"favoriteItems.product":product};
            update = {
              "$set":{
                "favoriteItems.$":{
                  ...req.body.favoriteItems,
                  quantity: item.quantity + req.body.favoriteItems.quantity
                }
              }
            }
          }else{
            conditon = { user: req.user._id };
            update = {"$push":{
              "favoriteItems":req.body.favoriteItems
            }
          }; 
          };
          Favorite.findOneAndUpdate(condition ,update)
          .exec((error,_favorite) =>{
            if (error) return res.status(400).json({ error });
            if (_favorite) return res.status(201).json({ favorite:_favorite });
          });
        } else{
          // if card not exists then create new cart
          const favorite = new Favorite({
            user: req.user._id,
            favoriteItems: [ req.body.favoriteItems ]
          });
          favorite.save((error, favorite) => {
            if (error) return res.status(400).json({ error });
            if (favorite) {
              return res.status(201).json({ favorite });
            }
          });
        } 
      });
} 
          
      




