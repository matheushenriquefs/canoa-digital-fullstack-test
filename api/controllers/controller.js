const MONGOOSE = require("mongoose");
const VEICULO_MODEL = MONGOOSE.model("veiculo");

exports.readAll = (req, res) => {
  VEICULO_MODEL.find({}, (err, veiculos) => {
    if (err) res.status(500).send(err);
    res.send(veiculos);
  });
};

exports.create = (req, res) => {
  const NOVO_VEICULO = new VEICULO_MODEL(req.body);
  NOVO_VEICULO.save((err, veiculo) => {
    if (err) res.status(500).send(err);
    res.send(veiculo);
  });
};

exports.read = (req, res) => {
  VEICULO_MODEL.findById(req.params.veiculoId, (err, veiculo) => {
    if (err) res.status(500).send(err);
    res.send(veiculo);
  });
};

exports.update = (req, res) => {
  VEICULO_MODEL.findByIdAndUpdate(
    {_id: req.params.veiculoId},
    req.body,
    {new: true},
    (err, veiculo) => {
      if (err) res.status(500).send(err);
      res.send(veiculo);
    }
  );
};

exports.delete = (req, res) => {
  VEICULO_MODEL.findByIdAndDelete({_id: req.params.veiculoId}, err => {
    if (err) res.status(500).send(err);
    res.send({_id: req.params.veiculoId});
  });
};