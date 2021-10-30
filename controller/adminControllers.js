const Service = require('../model/Service');
const Bank = require('../model/Bank');
const Item = require('../model/Item');
const Image = require('../model/Image');
const Feature = require('../model/Feature');
const Step = require('../model/Step');
const User = require('../model/Users');
const Booking = require('../model/Booking');
const Member = require('../model/Member');
const bcrypt = require('bcryptjs');
const fs = require('fs-extra');
const path = require('path');

module.exports= {
  viewDashboard : async(req, res) => {
    try {
      const member = await Member.find();
      const booking = await Booking.find();
      const item = await Item.find();
      console.log(member);
      res.render('admin/dashboard/view_dashboard', {title: "car-treatment.com | Dashboard", user : req.session.user, member, booking, item});
    } catch (error) {
      res.redirect('/admin/dashboard');
    }
  },
  viewSignin : async (req, res) => {
    try{
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {message: alertMessage, status: alertStatus};
      if(req.session.user == null || req.session.user == undefined){
        res.render('index', {alert, title: "Login"});
      }else{
        res.redirect('/admin/dashboard');
      }
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/signin');
    } 
  },
  actionSignin : async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ userName : username });
      if(!user){
        req.flash('alertMessage', 'User not found');
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/signin');
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if(!isPasswordMatch){
        req.flash('alertMessage', 'Password is wrong');
        req.flash('alertStatus', 'danger');
        res.redirect('/admin/signin');
      }

      req.session.user = {
        id : user._id,
        username : user.userName
      }
      res.redirect ('/admin/dashboard');
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/signin');
    }
  },
  actionLogout : async (req, res) => {
    try {
      req.session.destroy();
      res.redirect('/admin/signin');
      
    } catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/dashboard');
    }
  },
  //-------------USER
  viewUser : async (req, res) => {
    try{
      const user = await User.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {message: alertMessage, status: alertStatus};
      res.render('admin/user/view_user', {alert, user, title: "car-treatment.com | User", user : req.session.user});
    }catch (error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'success');
      res.redirect('/admin/user');
    }
  },
  addUser : async(req, res) => {
    try{
      const { userName, password } = req.body;
      console.log(password);
      await User.create({userName, password});
      req.flash('alertMessage', 'User added successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/user');
    }catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/user');
    }
  },
  editUser : async(req, res) => {
    try{
      const { id, userName } = req.body;
      console.log(userName);
      const user = await User.findOne({ _id: id });
      user.userName = userName;
      await user.save();
      req.flash('alertMessage', 'User edited successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/user');
    }catch (error) {
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/user');
    }
  },
  deleteUser : async (req, res) => {
    try{
      const { id } = req.params;
      const user = await User.findOne({ _id : id });
      await user.remove();
      req.flash('alertMessage', 'User deleted successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/user');
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/user');
    }
  },
  //___________ENDUSER
  //-----------SERVICE
  viewService : async(req, res) => {
    try{
      const service = await Service.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {message: alertMessage, status: alertStatus};
      res.render('admin/service/view_service', {
        service,
        alert,
        title: "car-treatment.com | Service",
        user : req.session.user
      });
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/service');
    }
  },
  addService : async(req, res) => {
    try{
      const {name} = req.body;
      // console.log(name);
      await Service.create({name});
      req.flash('alertMessage', 'Service added successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/service');
    }catch(error){
      req.flash('alertMessage', `$error.message`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/service');
    }
  },
  editService : async (req, res) => {
    try{
      const { id, name } = req.body;
      const service = await Service.findOne({_id:id});
      service.name = name;
      await service.save();
      req.flash('alertMessage', 'Service edited successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/service');
    }catch(error){
      req.flash('alertMessage', `$error.message`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/service');
    }
  },
  deleteService : async (req, res) => {
    try{
      const { id } = req.params;
      const service = await Service.findOne({_id:id});
  
      await service.remove();
      req.flash('alertMessage', 'Service deleted successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/service');
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/service');
    }
  },
  //________END SERVICCE

  //----Bank
  viewBank : async (req, res) => {
    try{
      const bank = await Bank.find();
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {message:alertMessage, status: alertStatus};
      res.render('admin/bank/view_bank', {
        bank,
        alert,
        title: "car-treatment.com | Bank",
        user : req.session.user});
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('amdmin/bank');
    }
  },
  addBank : async (req, res) => {
    try{
      const { bankName, accountNumber, name } = req.body;
      await Bank.create({ 
        bankName, 
        accountNumber, 
        name, 
        imageUrl: `images/${req.file.filename}` 
      });
      req.flash('alertMessage', 'Bank added successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/bank');
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/bank');
    }
  },
  editBank : async (req, res) => {
    try{
      const { id, bankName, accountNumber, name} = req.body;
      const bank = await Bank.findOne({_id:id});
      if (req.file == undefined){
        bank.bankName = bankName;
        bank.name = name;
        bank.accountNumber = accountNumber;
        await bank.save()
        req.flash('alertMessage', 'Bank edited successfully');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/bank');
      }else{
        await fs.unlink(path.join(`public/${bank.imageUrl}`));
        bank.bankName = bankName;
        bank.name = name;
        bank.accountNumber = accountNumber;
        bank.imageUrl = `images/${req.file.filename}`
        await bank.save()
        req.flash('alertMessage', 'Bank edited successfully');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/bank');
      }
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/bank');
    }
  },
  deleteBank : async(req, res) => {
    try{
      const { id } = req.params;
      const bank = await Bank.findOne({_id:id});
      await fs.unlink(path.join(`public/${bank.imageUrl}`));

      await bank.remove();
      req.flash('alertMessage', 'Bank deleted successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/bank');
    }catch (error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/bank');
    }
  },
  //___________ENDBANK
  //------------ITEM
  viewItem : async (req, res) => {
    try{
      const item = await Item.find()
      .populate({ path: 'imageId', select: 'id imageUrl' })
      .populate({ path: 'serviceId', select: 'id name' });
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {message:alertMessage, status: alertStatus};
      const service = await Service.find();
      const step = await Step.find();
      res.render('admin/item/view_item', {title: "car-treatment.com | Item", item, service, alert, action: 'view', user : req.session.user});
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/item');
    }
  },
  addItem : async (req, res) => {
    try{
      const { title, price, serviceId, description } = req.body;
      if(req.files.length > 0){
        const service = await Service.findOne({ _id:serviceId });
        // console.log(service);
        const newItem = {
          serviceId : service._id,
          title,
          price,
          description
        }
        const item = await Item.create(newItem);
        service.itemId.push({ _id : item._id });
        await service.save();
        for(let i = 0; i < req.files.length; i++){
          const image = await Image.create({ imageUrl : `images/${req.files[i].filename}` });
          item.imageId.push({ _id : image._id });
          await item.save();
        }
        req.flash('alertMessage', 'Item added successfully');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/item');
      }
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/item');
    }
  },
  shomImageItem : async (req,res) => {
    try{
      const { id } = req.params;
      const item = await Item.findOne({ _id : id })
      .populate({path: 'imageId', select: 'id imageUrl'});
     
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {message:alertMessage, status: alertStatus};
      const service = await Service.find();
      res.render('admin/item/view_item', {title: "car-treatment.com | Show Image Item", item, alert, action: 'show-image', user : req.session.user});
    }catch (error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/item');
    }
  },
  shomEditItem : async (req,res) => {
    try{
      const { id } = req.params;
      const item = await Item.findOne({ _id : id })
      .populate({path: 'imageId', select: 'id imageUrl'})
      .populate({path: 'serviceId', select: 'id name'});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {message:alertMessage, status: alertStatus};
      const service = await Service.find();
      res.render('admin/item/view_item', {title: "car-treatment.com | Edit Item", item, alert, service,action: 'edit', user : req.session.user});
    }catch (error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/item');
    }
  },
  editItem: async (req, res) => {
    try{
      const { id } = req.params;
      const { title, price, serviceId, description } = req.body;
      const item = await Item.findOne({ _id : id })
      .populate({path: 'imageId', select: 'id imageUrl'})
      .populate({path: 'serviceId', select: 'id name'});

      if( req.files.length > 0){
        for(let i = 0; i < item.imageId.length; i++){
          const imageUpdate = await Image.findOne({_id : item.imageId[i].id});
          await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
          imageUpdate.imageUrl = `images/${req.files[i].filename}`;
          await imageUpdate.save();
        }
        item.title = title,
        item.price = price,
        item.description = description,
        item.serviceId = serviceId
        await item.save();
        req.flash('alertMessage', 'Item edited successfully');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/item');
      }else{
        item.title = title,
        item.price = price,
        item.description = description,
        item.serviceId = serviceId
        await item.save();
        req.flash('alertMessage', 'Item edited successfully');
        req.flash('alertStatus', 'success');
        res.redirect('/admin/item');
      }
    }catch (error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/item');
    }
  },
  deleteItem: async(req, res) => {
    try{
      const { id } = req.params;
      const item = await Item.findOne({ _id : id }).populate( 'imageId' );
      for (let i = 0; i < item.imageId.length; i++){
        Image.findOne({_id : item.imageId[i]._id}).then((image) => {
          fs.unlink(path.join(`public/${image.imageUrl}`));
          image.remove();
        }).catch((error) => {
          req.flash('alertMessage', `${error.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect('/admin/item');
        });
      }
      await item.remove();
      req.flash('alertMessage', 'Item deleted successfully');
      req.flash('alertStatus', 'success');
      res.redirect('/admin/item');
    }catch (error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect('/admin/item');
    }
  },
  //______________ENDITEM
  //---------------DETAILITEM
  viewDetailItem : async(req, res) => {
    const { itemId }= req.params;
    console.log(itemId);
    try{
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {message:alertMessage, status: alertStatus};
      const feature = await Feature.find({ itemId : itemId });
      const step = await Step.find({  itemId : itemId   })
      res.render('admin/item/detail_item/view_detail_item', {title: "car-treatment.com | Detail Item" , alert, itemId, feature, step, user : req.session.user});
    }catch (error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },
  addFeature : async (req, res) => {
    
    const { name, qty, itemId } = req.body;
    try{
      if(!req.file) {
        req.flash('alertMessage', 'Image not found');
        req.flash('alertStatus', 'danger');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
      const feature = await Feature.create({ 
        name,
        qty,
        itemId,
        imageUrl: `images/${req.file.filename}` 
      });
      
      const item = await Item.findOne({ _id : itemId });
      item.featureId.push({ _id : feature.id });
      await item.save();
      req.flash('alertMessage', 'Feature added successfully');
      req.flash('alertStatus', 'success');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus',  'danger');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },
  editFeature : async (req, res) => {
    const { id, name, qty, itemId } = req.body;
    try{
      const feature = await Feature.findOne({ _id : id });
      if (req.file == undefined){
        feature.name = name;
        feature.qty = qty;
        await feature.save()
        req.flash('alertMessage', 'Feature edited successfully');
        req.flash('alertStatus', 'success');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }else{
        await fs.unlink(path.join(`public/${feature.imageUrl}`));
        feature.name = name;
        feature.qty = qty;
        feature.imageUrl = `images/${req.file.filename}`
        await feature.save()
        req.flash('alertMessage', 'Feature edited successfully');
        req.flash('alertStatus', 'success');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },
  deleteFeature : async (req, res)=>{
    const { id, itemId } = req.params;

    try{
      const feature = await Feature.findOne({ _id : id });

      const item = await Item.findOne({ _id : itemId }).populate('featureId');
      for(let i = 0; i < item.featureId.length; i++){
        if(item.featureId[i]._id.toString() === feature._id.toString()){
          item.featureId.pull({ _id : feature._id });
          await item.save();
        }
      }
      await fs.unlink(path.join(`public/${feature.imageUrl}`));
      await feature.remove();
     
      req.flash('alertMessage', 'Feature deleted successfully');
      req.flash('alertStatus', 'success');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }catch (error){
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },
  addStep : async (req, res) => {
    const { name, description, itemId } = req.body;
    try{
      if(!req.file) {
        req.flash('alertMessage', 'Image not found');
        req.flash('alertStatus', 'danger');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
      const step = await Step.create({ 
        name,
        description,
        itemId,
        imageUrl: `images/${req.file.filename}` 
      });
      const item = await Item.findOne({ _id : itemId });
      item.stepId.push({ _id : step.id });
      await item.save();
      req.flash('alertMessage', 'Step added successfully');
      req.flash('alertStatus', 'success');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus',  'danger');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },
  editStep : async (req, res) => {
    const { id, name, description, itemId } = req.body;
    try{
      const step = await Step.findOne({ _id : id });
      if (req.file == undefined){
        step.name = name;
        step.description = description;
        await step.save();
        req.flash('alertMessage', 'Step edited successfully');
        req.flash('alertStatus', 'success');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }else{
        await fs.unlink(path.join(`public/${step.imageUrl}`));
        step.name = name;
        step.description = description;
        step.imageUrl = `images/${req.file.filename}`
        await step.save()
        req.flash('alertMessage', 'Step edited successfully');
        req.flash('alertStatus', 'success');
        res.redirect(`/admin/item/show-detail-item/${itemId}`);
      }
    }catch(error){
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },
  deleteStep : async (req, res)=>{
    const { id, itemId } = req.params;

    try{
      const step = await Step.findOne({ _id : id });

      const item = await Item.findOne({ _id : itemId }).populate('stepId');
      for(let i = 0; i < item.stepId.length; i++){
        if(item.stepId[i]._id.toString() === step._id.toString()){
          item.stepId.pull({ _id : step._id });
          await item.save();
        }
      }
      await fs.unlink(path.join(`public/${step.imageUrl}`));
      await step.remove();
     
      req.flash('alertMessage', 'Step deleted successfully');
      req.flash('alertStatus', 'success');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }catch (error){
      console.log(error);
      req.flash('alertMessage', `${error.message}`);
      req.flash('alertStatus', 'danger');
      res.redirect(`/admin/item/show-detail-item/${itemId}`);
    }
  },
  //______________ENDDETAILITEM
  viewBooking : async(req, res) => {
    try {
      const booking = await Booking.find()
      .populate('memberId')
      .populate('bankId')
      .populate('itemId');
      
      res.render('admin/booking/view_booking', {title: "car-treatment.com | Booking", user : req.session.user, booking});
    } catch (error) {
      res.redirect('/admin/booking')   
    }
  },

  //--------SHOWDETAILBOOKING
  viewShowDetailBooking : async (req, res) => {
    const { id } = req.params;
    try {
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {message:alertMessage, status: alertStatus};

      const booking = await Booking.findOne({ _id : id })
      .populate('memberId')
      .populate('bankId')
      .populate('itemId');
      console.log(booking);
      res.render('admin/booking/show_detail_booking', {title: "car-treatment.com | Booking", user : req.session.user, booking, alert});
      
    } catch (error) {
      res.redirect(`/admin/booking/${id}`)   
    }    
  },
  //________ENDSHOWDETAILBOOKING

  
  //--------CONFIRMATION
  actionConfirmation : async(req,res) => {
    const { id } = req.params;
    try {
      const booking = await Booking.findOne({ _id:id });
      booking.payments.status = 'Accept';
     
      await booking.save();
      req.flash('alertMessage', 'Confirmaton succses');
      req.flash('alertStatus', 'success');
      res.redirect(`/admin/booking/${id}`)
    } catch (error) {
      res.redirect(`/admin/booking/${id}`)   
    }
  },

  actionReject : async(req,res) => {
    const { id } = req.params;
    try {
      const booking = await Booking.findOne({ _id:id });
      booking.payment.status = 'Reject';
      await booking.save();
      req.flash('alertMessage', 'Confirmaton Rejected');
      req.flash('alertStatus', 'success');
      res.redirect(`/admin/booking/${id}`)
    } catch (error) {
      res.redirect(`/admin/booking/${id}`)   
    }
  }
  //_________ENDCONFIRMATION
}