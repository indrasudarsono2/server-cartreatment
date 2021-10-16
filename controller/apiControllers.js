const Item = require('../model/Item');
const Costumer = require('../model/Member');
const Booking = require('../model/Booking');
const Service = require('../model/Service');
const Bank = require('../model/Bank');

module.exports = {
  landingPage : async (req, res) => {
    try {
      const mostFav = await Item.find()
                      .select('_id title price unit imageId')
                      .limit(5)
                      .populate({ path: 'imageId', select: '_id imageUrl' });
      const costumer = await Costumer.find();
      const car = await Booking.find();
      const service = await Service.find()
                      .select('_id name')
                      .limit(3)
                      .populate({ 
                        path:'itemId', 
                        select:'_id title imageId isFavorite',
                        perDocumentLimit:4,
                        option:{ sort:{ sumBooking : -1 } },
                        populate: {
                          path:'imageId', 
                          select:'_id imageUrl',
                          perDocumentLimit:1
                        }
                      });

      // for(let i = 0 ; i < service.length ; i++){
      //   for(let j = 0 ; j < service[i].itemId.length ; j++){
      //     const item = await Item.findOne({ _id:service[i].itemId[j]._id });
      //     item.isFavorite = false;
      //     await item.save();
      //     if(service[i].itemId[0] === service[i].itemId[j]){
      //       isFavorite = true;
      //       await item.save();
      //     }
      //   }
      // }

      const testimony = {
        _id: "1",
        imageUrl: "images/testimonial/testimony-1.jpg",
        name: "Indra Sudarsono",
        occupation: "Air Traffic Controller",
        rate: 4.6,
        comment: "Great  service, great price, great deal"
      }
      res.status(200).json({ 
        hero : {
          costumers: costumer.length,
          cars: car.length
        },
        mostFav,
        service,
        testimony
      })
    } catch (error) {
      console.log('error');
      res.status(500).json({ message:'internal server error' })
    }
  },

  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id : id })
                    .populate({
                      path:'imageId',
                      select:'_id imageUrl'
                    });
      const bank = await Bank.find();
      const testimony = {
        _id: "1",
        imageUrl: "images/testimonial/testimony-1.jpg",
        name: "Indra Sudarsono",
        occupation: "Air Traffic Controller",
        rate: 4.6,
        comment: "Great  service, great price, great deal"
      }

      res.status(200).json({ 
        ...item._doc,
        bank,
        testimony
      })
    } catch (error) {
      console.log('error');
      res.status(500).json({ message:'internal server error' })
    }
  },

  bookingPage : async(req, res) => {
    const {
      idItem,
      car,
      // price,
      bookingStartDate,
      bookingEndDate,
      firstName,
      lastName,
      email,
      phoneNumber,
      accountHolder,
      bankFrom,
    } = req.body;

    if(!req.file){
      return res.status(404).json({message:'Image not found!!!'});
    }

    if(
      idItem === undefined ||
      car === undefined ||
      // price === undefined ||
      bookingStartDate === undefined ||
      bookingEndDate === undefined ||
      firstName === undefined ||
      lastName === undefined ||
      email === undefined ||
      phoneNumber === undefined ||
      accountHolder === undefined ||
      bankFrom === undefined){
        
        res.status(404).json({message : 'Fill up the whole fields'})
      }
    const fileName = req.file.filename;

    const item = await Item.findOne({ _id : idItem });

    if(!item){
      res.status(404).json({ message : 'Item not found' });
    }

    item.sumBooking += 1;

    await item.save();

    let total = item.price * car;

    const invoice = Math.floor(1000000+Math.random()*9000000);

    const member = await Costumer.create({
      firstName,
      lastName,
      email,
      phoneNumber
    });

    const newBooking = {
      invoice,
      bookingStartDate,
      bookingEndDate,
      total,
      itemId:{
        _id : item.id,
        title: item.title,
        price: item.price,
        car: car
      },
      memberId : member.id,
      payments : {
        proofPayment : `images/${fileName}`,
        bankFrom : bankFrom,
        accountHolder : accountHolder
      }
    }

    const booking = await Booking.create(newBooking);
    res.status(201).json({message : 'Success booking', booking})
  }
}