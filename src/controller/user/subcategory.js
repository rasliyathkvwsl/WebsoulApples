const Subcategory = require("../../models/subcategory");
const slugify = require("slugify");


function createSubcategories(categories, parentId = null) {
    const subcategoryList = [];
    let subcategory;
    if (parentId == null) {
      subcategory = categories.filter((cat) => cat.parentId == undefined);
    } else {
      subcategory = categories.filter((cat) => cat.parentId == parentId);
    }
  
    for (let cate of subcategory) {
      subcategoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        type: cate.type,
        children: createsubCategories(categories, cate._id),
      });
    }
  
    return subcategoryList;
  }


exports.addSubcategory = (req, res) => {

    const subcategoryObj ={
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.file){
      subcategoryObj.categoryImage=process.env.API + '/public/'+req.file.filename;
    }

    if(req.body.parentId){
        subcategoryObj.parentId = req.body.parentId;
    }

    const cat = new Subcategory(subcategoryObj);
    cat.save((error, subcategory) => {
        if(error) {
            return res.status(400).json({ error });
        }
        if(subcategory){
            return res.status(201).json({ subcategory });
        }

    });

}

exports.getSubcategories = (req, res) => {
    Subcategory.find({}).exec((error, categories) => {
      if (error) return res.status(400).json({ error });
      if (categories) {
        const subcategoryList = createSubcategories(categories);
        res.status(200).json({ subcategoryList });
      }
    });
  };