import { EContainerType, TCfgItem, TResult } from './types'

export const checkCfg = <T>({ cfg, tested, isDebugEnabled }: {
  cfg: TCfgItem[];
  isDebugEnabled: boolean;
  tested: T;
}): TResult => {
  const res: TResult = {
    ok: true,
    reason: 'Ok',
    output: {
      wagonLength: 0,
      wagonWidth: 0,
      wagonHeight: 0,
      wagonCarryingCapacity: 0,
      maxInWagon: 0,
      maxRowsInWagon_byWagonWidth: 0,
      maxRowsInWagon_byWagonLength: 0,
      maxFloorsInWagon: 0,
      cargoType: '-',
      modelName: '-',
      containerType: EContainerType.TRUCK_V1,
      productList: [],
    },
  }
  const errs: string[] = []

  // if (isDebugEnabled) console.log(tested)

  for (const param of cfg) {
    switch (true) {
      // @ts-ignore
      case param.isRequired && !tested[param.name]:
        // @ts-ignore
        if (isDebugEnabled) console.log(tested[param.name])
        errs.push(`${param.name} is required`)
        break
      case param.isRequired: {
        try {
          // @ts-ignore
          let normalizedIfNecessary = tested[param.name]
          
          if (typeof param.getNormalized === 'function') {
            // @ts-ignore
            const _normalized = param.getNormalized(tested[param.name])

            if (_normalized.ok) normalizedIfNecessary = _normalized.value
            else throw new Error(_normalized.reason || 'No reason')
          }
          const validated = param.validator(normalizedIfNecessary)

          if (!validated.ok) errs.push(`${param.name} errored: ${validated.reason}`)
          // @ts-ignore
          else if (!!res.output) res.output[param.name] = normalizedIfNecessary
        } catch (err: any) {
          errs.push(`ERR0 ${err?.message || '-'}`)
        }

        break
      }
      default: break
    }
  }

  if (errs.length > 0) {
    res.ok = false
    res.reason = errs.join('; ')
  }

  return res
}
