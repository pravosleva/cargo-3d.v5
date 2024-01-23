import { TCfgItem, EContainerType } from './types'
import { getConvertedB64ToUtf8 } from './json-ops/getConvertedB64ToUtf8'

export const paramsCfg: TCfgItem[] = [
  {
    name: 'wagonLength',
    isRequired: true,
    getNormalized: (v: any) => ({
      ok: Number.isInteger(Number(v)),
      value: Number(v),
      reason: Number.isInteger(Number(v)) ? undefined : 'Should be integer',
    }),
    validator: (v: any) => {
      const res = { ok: true, reason: 'Ok' }
      const range = [2500, 13600] // NOTE: Min & Max vals
      const [min, max] = range
      switch (true) {
        case !Number.isInteger(v):
          res.ok = false
          res.reason = 'Should be integer'
          break
        case v < min:
          res.ok = false
          res.reason = `Значение длины контейнера меньше минимального ${min} mm (detected: ${v || typeof v})`
          break
        case v > max:
          res.ok = false
          res.reason = `Значение длины контейнера больше максимального ${max} mm (detected: ${v || typeof v})`
          break
        default: break
      }
      return res
    },
  },
  {
    name: 'wagonWidth',
    isRequired: true,
    getNormalized: (v: any) => ({
      ok: Number.isInteger(Number(v)),
      value: Number(v),
      reason: Number.isInteger(Number(v)) ? undefined : 'Should be integer',
    }),
    validator: (v: any) => {
      const res = { ok: true, reason: 'Ok' }
      const range = [1000, 5500] // NOTE: Min & Max vals
      const [min, max] = range
      switch (true) {
        case !Number.isInteger(v):
          res.ok = false
          res.reason = 'Should be integer'
          break
        case v < min:
          res.ok = false
          res.reason = `Значение ширины контейнера меньше минимального ${min} mm (detected: ${v || typeof v})`
          break
        case v > max:
          res.ok = false
          res.reason = `Значение ширины контейнера больше максимального ${max} mm (detected: ${v || typeof v})`
          break
        default: break
      }
      return res
    },
  },
  {
    name: 'wagonHeight',
    isRequired: true,
    getNormalized: (v: any) => ({
      ok: Number.isInteger(Number(v)),
      value: Number(v),
      reason: Number.isInteger(Number(v)) ? undefined : 'Should be integer',
    }),
    validator: (v: any) => {
      const res = { ok: true, reason: 'Ok' }
      const range = [1000, 5500] // NOTE: Min & Max vals
      const [min, max] = range
      switch (true) {
        case !Number.isInteger(v):
          res.ok = false
          res.reason = 'Should be integer'
          break
        case v < min:
          res.ok = false
          res.reason = `Значение высоты контейнера меньше минимального ${min} mm (detected: ${v || typeof v})`
          break
        case v > max:
          res.ok = false
          res.reason = `Значение высоты контейнера больше максимального ${max} mm (detected: ${v || typeof v})`
          break
        default: break
      }
      return res
    },
  },
  {
    name: 'wagonCarryingCapacity',
    isRequired: true,
    getNormalized: (v: any) => ({
      ok: Number.isInteger(Number(v)),
      value: Number(v),
      reason: Number.isInteger(Number(v)) ? undefined : 'Should be integer',
    }),
    validator: (v: any) => {
      const res = { ok: true, reason: 'Ok' }
      const range = [1000, 20000] // NOTE: Min & Max vals
      const [min, max] = range
      switch (true) {
        case !Number.isInteger(v):
          res.ok = false
          res.reason = 'Should be integer'
          break
        case v < min:
          res.ok = false
          res.reason = `Грузоподъемность контейнера меньше минимального ${min} mm (detected: ${v || typeof v})`
          break
        case v > max:
          res.ok = false
          res.reason = `Грузоподъемность контейнера больше максимального ${max} mm (detected: ${v || typeof v})`
          break
        default: break
      }
      return res
    },
  },
  {
    name: 'maxInWagon',
    isRequired: true,
    getNormalized: (v: any) => ({
      ok: Number.isInteger(Number(v)),
      value: Number(v),
      reason: Number.isInteger(Number(v)) ? undefined : 'Should be integer',
    }),
    validator: (v: any) => {
      const res = { ok: true, reason: 'Ok' }
      const range = [3, 13] // NOTE: Min & Max vals
      const [min, max] = range
      switch (true) {
        case !Number.isInteger(v):
          res.ok = false
          res.reason = 'Should be integer'
          break
        case v < min:
          res.ok = false
          res.reason = `Количество элементов в контейнере меньше минимального ${min} (detected: ${v || typeof v})`
          break
        case v > max:
          res.ok = false
          res.reason = `Количество элементов в контейнере больше максимального ${max} (detected: ${v || typeof v})`
          break
        default: break
      }
      return res
    },
  },
  {
    name: 'maxRowsInWagon_byWagonWidth',
    isRequired: true,
    getNormalized: (v: any) => ({
      ok: Number.isInteger(Number(v)),
      value: Number(v),
      reason: Number.isInteger(Number(v)) ? undefined : 'Should be integer',
    }),
    validator: (v: any) => {
      const res = { ok: true, reason: 'Ok' }

      switch (true) {
        case !Number.isInteger(v):
          res.ok = false
          res.reason = 'Should be integer'
          break
        default: break
      }
      
      return res
    },
  },
  {
    name: 'maxRowsInWagon_byWagonLength',
    isRequired: true,
    getNormalized: (v: any) => ({
      ok: Number.isInteger(Number(v)),
      value: Number(v),
      reason: Number.isInteger(Number(v)) ? undefined : 'Should be integer',
    }),
    validator: (v: any) => {
      const res = { ok: true, reason: 'Ok' }

      switch (true) {
        case !Number.isInteger(v):
          res.ok = false
          res.reason = 'Should be integer'
          break
        default: break
      }
      
      return res
    },
  },
  {
    name: 'maxFloorsInWagon',
    isRequired: true,
    getNormalized: (v: any) => ({
      ok: Number.isInteger(Number(v)),
      value: Number(v),
      reason: Number.isInteger(Number(v)) ? undefined : 'Should be integer',
    }),
    validator: (v: any) => {
      const res = { ok: true, reason: 'Ok' }

      switch (true) {
        case !Number.isInteger(v):
          res.ok = false
          res.reason = 'Should be integer'
          break
        default: break
      }
      
      return res
    },
  },
  {
    name: 'cargoType',
    isRequired: true,
    validator: (v: any) => {
      const possibleVals = ['thermocold_chillers', 'custom']
      const res = { ok: true, reason: 'Ok' }

      if (!possibleVals.includes(v)) {
        res.ok = false
        res.reason = `Incorrect value, that possible: ${possibleVals.join(', ')} (received: ${v})`
      }
      
      return res
    },
  },
  {
    name: 'modelName',
    isRequired: true,
    validator: (_v: any) => {
      const res = { ok: true, reason: 'Ok' }
      
      return res
    },
  },
  {
    name: 'containerType',
    isRequired: true,
    validator: (v: any) => {
      const possibleVals = Object.values(EContainerType)
      const res = { ok: true, reason: 'Ok' }

      if (!possibleVals.includes(v)) {
        res.ok = false
        res.reason = `Incorrect value, that possible: ${possibleVals.join(', ')} (received: ${v})`
      }
      
      return res
    },
  },
  {
    name: 'productList',
    isRequired: true,
    getNormalized: (v: any) => {
      const res = { ok: true, reason: 'Ok', value: null }
      const getProductListJSON = (s: any) => {
        try {
          const json = JSON.parse(getConvertedB64ToUtf8(s))
          return json
        } catch (err: any) {
          throw new Error(`Ошибка при конвертации ${err.message || 'No err.message'}`)
        }
      }
      try {
        res.value = getProductListJSON(v)
      } catch (err: any) {
        res.ok = false
        res.reason = err?.message || 'No err.message'
      }
      return res
    },
    validator: (v: any) => {
      const res = { ok: true, reason: 'Ok' }

      try {
        if(!Array.isArray(v)) {
            res.ok = false
            res.reason = 'Should be an Array'
        } else {
          const errs = []
          const checkProduct = (p: any): ({
            ok: boolean;
            reason: string;
          }) => {
            const res = { ok: true, reason: 'Ok' }
            const rules: {
              [key: string]: {
                type: 'string' | 'number';
                isRequired: boolean;
              };
            } = {
              id: {
                type: 'string',
                isRequired: true,
              },
              name: {
                type: 'string',
                isRequired: true,
              },
              comment: {
                type: 'string',
                isRequired: false,
              },
              width: {
                type: 'number',
                isRequired: true,
              },
              height: {
                type: 'number',
                isRequired: true,
              },
              length: {
                type: 'number',
                isRequired: true,
              },
              weight: {
                type: 'number',
                isRequired: true,
              },
            }

            for (const key in rules) {
              if (rules[key].isRequired && !p[key]) {
                res.ok = false
                res.reason = `"${key}" is required for "${p.name || 'NoName'}"`
              }
            }

            return res
          }
          for (const product of v) {
            const checked = checkProduct(product)
            if (!checked.ok) errs.push(checked.reason || 'Product is not Ok')
          }
          if (errs.length > 0) throw new Error(errs.join(', '))
        }
      } catch (err: any) {
        res.ok = false
        res.reason = err?.message || 'No err.message'
      }
      
      return res
    },
  },
]
