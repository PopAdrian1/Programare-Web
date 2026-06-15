const mongoose = require('mongoose');

const livadaSchema = new mongoose.Schema({
  parametri: {
    suprafata: { type: Number, required: true },
    lungime: { type: Number, required: true },
    latime: { type: Number, required: true },
    rowSpacing: { type: Number, required: true },
    colSpacing: { type: Number, required: true }
  },
  rezultat: {
    grid: { type: mongoose.Schema.Types.Mixed, required: true },
    fitness: { type: Number, required: true }
  }
}, { timestamps: true });

livadaSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Livada', livadaSchema);