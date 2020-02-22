const MONGOOSE = require("mongoose");

const {Schema} = MONGOOSE;

const VEICULO_SCHEMA = new Schema(
  {
    veiculo:{
      type: String,
      required: [true, "O nome do veículo não pode estar vazio"],
      trim: true,
      minlength: [2, "O nome do veículo deve conter mais de 3 caracteres"],
      maxlength: [75, "O nome do veículo é grande demais"],
      validate: {
        validator: val => {
          if(!new RegExp(/^[a-zA-Z\u00C0-\u00FF\0-9]*$/).test(val)){
            throw new Error ("Um veículo válido NÃO deve conter caracteres especiais");
          }
        }
      }
    },
    marca:{
      type: String,
      required: [true, "O nome da marca não pode estar vazio"],
      trim: true,
      minlength: [2, "O nome da marca deve conter mais de 3 caracteres"],
      maxlength: [75, "O nome da marca é grande demais"],
      validate: {
        validator: val => {
          if(!new RegExp(/^[a-zA-Z\u00C0-\u00FF\0-9]*$/).test(val)){
            throw new Error ("Uma marca válida NÃO deve conter caracteres especiais");
          }
        }
      }
    },
    ano:{
      type: Number,
      required: [true, "O ano do veículo não pode estar vazio"],
      trim: true,
      validate: {
        validator: val => {
          if(!new RegExp(/^[1-9]\d{3}$/g).test(val)){
            throw new Error ("Um ano válido NÃO deve conter letras, caracteres especiais ou números negativos");
          }
        }
      }
    },
    descricao:{
      type: String,
      required: [true, "A descrição do veículo não pode estar vazia"],
      trim: true,
      minlength: [10, "Descrição do veículo inválida, ela deve conter mais de 10 caracteres"]
    },
    vendido:{
      type: Boolean,
      required: [true, "Você deve informar se o veículo foi vendido"]
    },
    created_at:{
      type: Date
    },
    update_at:{
      type: Date
    }
  }
);

module.exports = MONGOOSE.model("veiculo", VEICULO_SCHEMA);