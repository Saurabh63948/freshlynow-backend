import AddressModel from "../models/address.model.js";


export const createAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const data = req.body;

  
    if (data.isDefault) {
      await AddressModel.updateMany(
        { userId },
        { isDefault: false }
      );
    }

    const address = await AddressModel.create({
      ...data,
      userId,
    });

    res.status(201).json({
      success: true,
      data: address,
      message: "Address created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAddresses = async (req, res) => {
  try {
    const addresses = await AddressModel.find({
      userId: req.userId,
      status: true,
    }).sort({ isDefault: -1, createdAt: -1 });

    res.json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const data = req.body;

   
    if (data.isDefault) {
      await AddressModel.updateMany(
        { userId },
        { isDefault: false }
      );
    }

    const address = await AddressModel.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      data: address,
      message: "Address updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const address = await AddressModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

  
    if (address.isDefault) {
      const next = await AddressModel.findOne({ userId });
      if (next) {
        next.isDefault = true;
        await next.save();
      }
    }

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // sabko false
    await AddressModel.updateMany(
      { userId },
      { isDefault: false }
    );

    const address = await AddressModel.findOneAndUpdate(
      { _id: id, userId },
      { isDefault: true },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.json({
      success: true,
      data: address,
      message: "Default address updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
