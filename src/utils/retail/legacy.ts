/*
* Created by amstel at 27.12.2016
*/

export const retail = (function(){
  return{
    data: function(arg: any){
      // arg.cargoType, arg.modelName
      let multiplier,
        currency,
        comment,
        maxInWagon,
        addSize,
        maxRowsInWagon_byWagonWidth,
        maxRowsInWagon_byWagonLength,
        maxFloorsInWagon,
        finalCoeff1,
        finalCoeff2,
        templateNumber;
      // Вводные
      var dostavka, course_USD_EUR, tmj, formaliz;
      switch(arg.cargoType){
        case "thermocold_chillers":
          multiplier = 0.3;
          currency = "EUR";
          maxInWagon = 13;
          addSize = 50;
          maxRowsInWagon_byWagonWidth = 1;
          maxRowsInWagon_byWagonLength = 200;
          maxFloorsInWagon = 1;

          dostavka = 4500;
          course_USD_EUR = 1.1;
          tmj = 12;
          formaliz = 1500;
          finalCoeff1 = 1.05;
          finalCoeff2 = 2.05;

          templateNumber = 1;
          /*
          switch(arg.modelName){
            case "DOMINO": multiplier = 0.3;
            default: multiplier = 0.3;
          }
          */
          arg.modelName !== "" ? comment = "About calculation for Thermocold production... (model " + arg.modelName + ")" : comment = "About calculation for Thermocold production...";
          break;
        case "luvata_evaporators":
          multiplier = 0.46;
          currency = "EUR";
          maxInWagon = 500;
          addSize = 50;
          maxRowsInWagon_byWagonWidth = 2;
          maxRowsInWagon_byWagonLength = 200;
          maxFloorsInWagon = 1;

          dostavka = 4000;
          course_USD_EUR = 1.1;
          tmj = 12;
          formaliz = 1500;
          finalCoeff1 = 1.05;
          finalCoeff2 = 2.05;

          templateNumber = 7;
          arg.modelName !== "" ? comment = "About calculation for LUVATA production... (model " + arg.modelName + ")" : comment = "About calculation for LUVATA production...";
          break;
        case "thermokey_dryCoolers":
          multiplier = 0.425;
          currency = "EUR";
          maxInWagon = 13;
          addSize = 50;
          maxRowsInWagon_byWagonWidth = 1;
          maxRowsInWagon_byWagonLength = 200;
          maxFloorsInWagon = 1;

          dostavka = 4000;
          course_USD_EUR = 1.1;
          tmj = 12;
          formaliz = 1500;
          finalCoeff1 = 1.05;
          finalCoeff2 = 2.05;

          templateNumber = 8;

          arg.modelName !== "" ? comment = "About calculation for Thermokey production... (model " + arg.modelName + ")" : comment = "About calculation for Thermokey production...";
          break;
        case "stefani_evaporators":
          multiplier = 0.52;
          currency = "EUR";
          maxInWagon = 500;
          addSize = 50;
          maxRowsInWagon_byWagonWidth = 2;
          maxRowsInWagon_byWagonLength = 200;
          maxFloorsInWagon = 1;

          dostavka = 4000;
          course_USD_EUR = 1.1;
          tmj = 12;
          formaliz = 1500;
          finalCoeff1 = 1.05;
          finalCoeff2 = 2.05;

          templateNumber = 11;
          arg.modelName !== "" ? comment = "About calculation for Stefani production... (model " + arg.modelName + ")" : comment = "About calculation for Stefani production...";
          //comment = comment + " / "
          break;
        case "bac_coolingTowersOpenTypeDry":
          multiplier = 1.0;
          currency = "EUR";
          maxInWagon = 500;
          addSize = 50;
          maxRowsInWagon_byWagonWidth = 2;
          maxRowsInWagon_byWagonLength = 200;
          maxFloorsInWagon = 1;

          dostavka = 3000;
          course_USD_EUR = 1.12;
          tmj = 0;
          formaliz = 1500;
          finalCoeff1 = 1.05;
          finalCoeff2 = 2.05;

          templateNumber = 23;
          arg.modelName !== "" ? comment = "About calculation for BAC Cooling Towers... (model " + arg.modelName + ")" : comment = "About calculation for BAC Cooling Towers...";
          //comment = comment + " / "
          break;
        // etc.
        default:
          multiplier = 1;
          currency = "?";
          maxInWagon = 13;
          addSize = 50;
          maxRowsInWagon_byWagonWidth = 1;
          maxRowsInWagon_byWagonLength = 200;
          maxFloorsInWagon = 1;

          dostavka = 0;
          tmj = 0;
          formaliz = 0;
          course_USD_EUR = 1.1;
          finalCoeff1 = 1;
          finalCoeff2 = 2;

          arg.modelName !== "" ? comment = "About calculation for undefined cargoType... (model " + arg.modelName + ")" : comment = "About calculation for undefined cargoType...";
      };
      return {
        multiplier: multiplier,
        currency: currency,
        comment: comment,
        maxInWagon: maxInWagon,
        maxRowsInWagon_byWagonWidth: maxRowsInWagon_byWagonWidth,
        maxRowsInWagon_byWagonLength: maxRowsInWagon_byWagonLength,
        maxFloorsInWagon: maxFloorsInWagon,
        addSize: addSize,
        finalCoeff1: finalCoeff1,
        finalCoeff2: finalCoeff2,
        vv: {
          dostavka,
          course_USD_EUR,
          tmj,
          formaliz,
          templateNumber,
        }
      }
    },
    inWagon: function(arg: any) {
      //console.log(arg);
      let length = Number(arg.length),
        width = Number(arg.width),
        height = Number(arg.height),
        weight = Number(arg.weight),
        maxInWagon = Number(arg.maxInWagon),
        addSize = Number(arg.addSize),
        maxRowsInWagon_byWagonWidth = Number(arg.maxRowsInWagon_byWagonWidth),
        maxRowsInWagon_byWagonLength = Number(arg.maxRowsInWagon_byWagonLength),
        maxFloorsInWagon = Number(arg.maxFloorsInWagon);
      //console.log(length, width, height);
      // console.log(maxFloorsInWagon)
      // console.log({ width, length, height })
      // The Wagon
      var wagon: {
        maxLength: number;
        maxWidth: number;
        maxHeight: number;
        maxWeight: number;
      } = {
        maxLength: Number(arg.wagon.maxLength),
        maxWidth: Number(arg.wagon.maxWidth),
        maxHeight: Number(arg.wagon.maxHeight),
        maxWeight: Number(arg.wagon.maxWeight),
      };

      // console.log(wagon)

      var l, w, floors, config: any = {}, horizontalOrientation: 'byLength' | 'byWidth' = 'byWidth';
      if(length < width){
        l = width + addSize;
        w = length + addSize;
      }else{
        w = width + addSize;
        l = length + addSize;
      };
      let result = 0
      let comment = `Additional horizontal size is ${addSize} mm
Dims for each unit [ in Blue + additional size ] is ${l} x ${w} x ${height} mm`;
      if(w > wagon.maxWidth){
        result = 0;
        comment += " / Наименьший гор. размер 1 единицы с учетом запаса превышает макс. ширину контейнера " + w + " > " + wagon.maxWidth + " mm!"
      } else if(l > wagon.maxLength){
        result = 0;
        comment += " / Наибольший гор. размер 1 единицы с учетом запаса превышает макс. длину контейнера " + l + " > " + wagon.maxLength + " mm!"
      } else if(height > wagon.maxHeight){
        result = 0;
        comment += " / Вертикальный размер 1 единицы превышает макс. высоту контейнера " + height + " > " + wagon.maxHeight + " mm!"
      } else if(weight > wagon.maxWeight){
        result = 0;
        comment += " / Масса 1 единицы превышает грузоподъемность контейнера " + weight + " > " + wagon.maxWeight + " kg!";
      } else{
        // расчетное количество ярусов в машине (в соответствии с разрешенным maxFloorsInWagon для данного бренда)
        floors = 1;
        for (let i=1; i<=maxFloorsInWagon; i++){
          // console.log(wagon.maxHeight)
          if (wagon.maxHeight >= (height * i))
            floors = i
        };

        // v2
        config.byLength1 = Math.floor(wagon.maxLength / (length + addSize));
        if(config.byLength1 > maxRowsInWagon_byWagonLength){config.byLength1 = maxRowsInWagon_byWagonLength};
        config.byWidth1 = Math.floor(wagon.maxWidth / (width + addSize));
        if(config.byWidth1 > maxRowsInWagon_byWagonWidth){config.byWidth1 = maxRowsInWagon_byWagonWidth};
        config.result1 = config.byLength1 * config.byWidth1;
        config.byLength2 = Math.floor(wagon.maxLength / (width + addSize));
        if(config.byLength2 > maxRowsInWagon_byWagonLength){config.byLength2 = maxRowsInWagon_byWagonLength};
        config.byWidth2 = Math.floor(wagon.maxWidth / (length + addSize));
        if(config.byWidth2 > maxRowsInWagon_byWagonWidth){config.byWidth2 = maxRowsInWagon_byWagonWidth};
        config.result2 = config.byLength2 * config.byWidth2;

        //result = Math.max(config.result1, config.result2);
        //if(result === config.result1){horizontalOrientation = "byLength"}else{horizontalOrientation = "byWidth"}
        if(config.result1 >= config.result2){
          result = config.result1;
          horizontalOrientation = 'byLength';
          // for the 3D model:
          config.pcsX = config.byLength1;
          config.pcsY = config.byWidth1;
          config.pcsZ = floors;
        }else if(config.result1 < config.result2){
          result = config.result2;
          horizontalOrientation = 'byWidth';
          // for the 3D model:
          config.pcsX = config.byLength2;
          config.pcsY = config.byWidth2;
          config.pcsZ = floors;
        }else{
          comment += " / Не удалось определить расположение груза относительно контейнера!";
        }

        //result = result * rows;
        if(result > maxRowsInWagon_byWagonLength * maxRowsInWagon_byWagonWidth){result = maxRowsInWagon_byWagonLength * maxRowsInWagon_byWagonWidth};
        if(result * floors > maxInWagon){
          result = maxInWagon
        }else{
          result = result * floors;
        }
      };//console.log(result);

      // Full length:
      let sizes: any = {};
      // 2) Height is firstly:
      let _pcs = 0, // количество отображаемых кубиков
        _pcsBlue = 0, _pcsXBlue = 0, _pcsYBlue = 0, _pcsZBlue = 0; // кол-во синих по X Y Z

			// --- Should be refactored!
			//if(result===1){
			//	_pcs = _pcsBlue = _pcsXBlue = _pcsYBlue = _pcsZBlue = 1;
			//}else{
				_pcs = 0;
				_pcsXBlue = _pcsYBlue = _pcsZBlue = 0;
				for (let j = 0; j < config.pcsX; j++){ // For each by X
					for (let k = 0; k < config.pcsZ; k++){ // For each by Z
						for (let i = 0; i < config.pcsY; i++) { // For each by Y
							_pcs += 1;
							if (_pcs <= result) {// If Blue
                _pcsBlue += 1;

								if (_pcsXBlue < j) _pcsXBlue = j;
								if (_pcsYBlue < i) _pcsYBlue = i;
								if (_pcsZBlue < k) _pcsZBlue = k;

							}
								//if( result > _pcsBlue ){ _pcsBlue += 1; };
								//if( _pcsYBlue < config.pcsY && result > _pcsXBlue*_pcsYBlue*_pcsZBlue ){ _pcsYBlue += 1; }
								/*
									If Blue then > If
								*/

						}
						//if( _pcsZBlue < config.pcsZ && result > _pcsXBlue*_pcsYBlue*_pcsZBlue ){ _pcsZBlue += 1; };
					}
					//if( _pcsXBlue < config.pcsX && result > _pcsXBlue*_pcsYBlue*_pcsZBlue ){ _pcsXBlue += 1; };
				};
				_pcsXBlue += 1;
				_pcsYBlue += 1;
				_pcsZBlue += 1;
			//}
			// ---

      sizes.pcsPossible = _pcsBlue;
      sizes.pcsXPossible = _pcsXBlue;
      sizes.pcsYPossible = _pcsYBlue;
      sizes.pcsZPossible = _pcsZBlue;
      switch(horizontalOrientation){
        case "byWidth":
          sizes.fullX = _pcsXBlue * (width + addSize);
          sizes.fullY = _pcsYBlue * (length + addSize);
          break;
        case "byLength":
        default:
          sizes.fullX = _pcsXBlue * (length + addSize);
          sizes.fullY = _pcsYBlue * (width + addSize);
          break;
      }
      sizes.fullZ = _pcsZBlue * height;
      sizes.comment = `Total units number is ${_pcs} pcs
Blue= ${_pcsBlue} pcs
BlueZ= ${_pcsZBlue} pcs
BlueY= ${_pcsYBlue} pcs
BlueX= ${_pcsXBlue} pcs
Full X size= ${sizes.fullX} mm
Full Y size= ${sizes.fullY} mm
Full Z size= ${sizes.fullZ} mm`;

      // Cost calc for 1 m. is possible...
      //...

      return { result, comment, horizontalOrientation, wagon, config, sizes }
    },
    costOfDelivery: function(arg: any){
      // Доставка
      var result, comment;
      var dostavka = Number(arg.dostavka), inWagon = Number(arg.inWagon);
      switch(arg.cargoType){
        case "Chillers Thermocold":
          result = (arg.dostavka / arg.inWagon).toFixed(2);
          comment = "Ok";
          break;
        case "Evaporators LUVATA":
          result = (dostavka / inWagon).toFixed(2);
          comment = "Ok: arg.dostavka= " + dostavka + " arg.inWagon= " + inWagon + " result= " + result;
          break;
        case "Dry Coolers Thermokey":
          result = (arg.dostavka / arg.inWagon).toFixed(2);
          comment = "Ok";
          break;
        case "Evaporators Stefani":
          result = (arg.dostavka / arg.inWagon).toFixed(2);
          comment = "Доставка= Input_dostavka/inWagon";
          break;
        case "Cooling Towers Open type Dry BAC":
          result = (arg.dostavka / arg.weight).toFixed(2);
          comment = "Доставка= Input_dostavka/weight";
          break;
        // etc.
        default:
          result = 0;
          comment = "cargoType is undefined"
      };
      return {result: result, comment: comment}
    },
    customsCosts: function(arg: any){
      // Таможня
      let result: any, comment;
      switch(arg.cargoType){
        case "Chillers Thermocold":
          result = (arg.weight * (arg.tmj / arg.course_USD_EUR * 0.25)).toFixed(2);
          if(result > 13000 && arg.inWagon === 1){result = 13000};
          comment = "Ok";
          break;
        case "Evaporators LUVATA":
          result = (arg.weight * (arg.tmj / arg.course_USD_EUR * 0.25)).toFixed(2);
          comment = "Ok";
          break;
        case "Dry Coolers Thermokey":
          result = ((arg.EXW + arg.costOfDelivery * 0.6) * 0.32).toFixed(2);
          comment = "Ok";
          break;
        case "Evaporators Stefani":
          result = ((arg.weight * 10 * 0.18) / arg.course_USD_EUR).toFixed(2);
          comment = "Таможня= weight*10*0,18/course_USD_EUR";
          break;
        case "Cooling Towers Open type Dry BAC":
          result = ((arg.weight * 10 * 0.18) / 1.25).toFixed(2);
          comment = "Таможня= weight*10*0,18/1.25";
          break;
        // etc.
        default:
          result = 0;
          comment = "cargoType is undefined"
      };
      return {result: result, comment: comment}
    },
    formalizationСosts: function(arg: any){
      // Оформление
      // arg.cargoType, arg.inWagon, arg.course_USD_EUR
      var result, comment;
      switch(arg.cargoType){
        case "Chillers Thermocold":
          result = (arg.formaliz / arg.course_USD_EUR / arg.inWagon).toFixed(2);
          comment = "Ok";
          break;
        case "Evaporators LUVATA":
          result = (arg.formaliz / arg.course_USD_EUR / arg.inWagon).toFixed(2);
          comment = "Ok";
          break;
        case "Dry Coolers Thermokey":
          result = (arg.formaliz / arg.course_USD_EUR / arg.inWagon).toFixed(2);
          comment = "Ok";
          break;
        case "Evaporators Stefani":
          result = (arg.formaliz / arg.course_USD_EUR / arg.inWagon).toFixed(2);
          comment = "Оформление = formaliz/course_USD_EUR/inWagon";
          break;
        case "Cooling Towers Open type Dry BAC":
          result = (arg.formaliz / arg.course_USD_EUR / arg.inWagon).toFixed(2);
          comment = "Оформление = formaliz/course_USD_EUR/inWagon";
          break;
        // etc.
        default:
          result = 0;
          comment = "cargoType is undefined"
      };
      return {result: result, comment: comment}
    },
    costPrice: function(arg: any){
      // CC
      // arg.cargoType, arg.EXW, arg.costOfDelivery, arg.customsCosts, arg.formalizationСosts
      var result, comment;
      switch(arg.cargoType){
        case "Chillers Thermocold":
          result = Number(arg.EXW) + Number(arg.costOfDelivery) + Number(arg.customsСosts) + Number(arg.formalizationСosts);
          //console.log(arg.EXW + " / " + arg.costOfDelivery + " / " + arg.customsСosts + " / " + arg.formalizationСosts);
          result = (result).toFixed(2);
          comment = "Ok";
          break;
        case "Evaporators LUVATA":
          result = Number(arg.EXW) + Number(arg.costOfDelivery) + Number(arg.customsСosts) + Number(arg.formalizationСosts);
          result = (result).toFixed(2);
          comment = "Ok";
          break;
        case "Dry Coolers Thermokey":
          result = Number(arg.EXW) + Number(arg.costOfDelivery) + Number(arg.customsСosts) + Number(arg.formalizationСosts);
          result = (result).toFixed(2);
          comment = "Ok";
          break;
        case "Evaporators Stefani":
          result = Number(arg.EXW) + Number(arg.costOfDelivery) + Number(arg.customsСosts) + Number(arg.formalizationСosts);
          result = (result).toFixed(2);
          comment = "CC = EXW+costOfDelivery+customsСosts+formalizationСosts";
          break;
        case "Cooling Towers Open type Dry BAC":
          result = Number(arg.EXW) + Number(arg.costOfDelivery) + Number(arg.customsСosts) + Number(arg.formalizationСosts);
          result = (result).toFixed(2);
          comment = "CC = EXW+costOfDelivery+customsСosts+formalizationСosts";
          break;
        // etc.
        default:
          result = 0;
          comment = "cargoType is undefined"
      };
      return {result: result, comment: comment}
    }
  }
})();
