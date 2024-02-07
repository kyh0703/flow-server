import { plainToInstance } from 'class-transformer'
import { IsEnum, validateSync } from 'class-validator'

enum Environment {
  Development = 'dev',
  Production = 'prod',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment
}

export function validate(config: Record<string, unknown>) {
  const validateConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validateConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validateConfig
}
