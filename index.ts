import * as hubspot from '@hubspot/api-client'
import {SimplePublicObjectWithAssociations} from '@hubspot/api-client/lib/codegen/crm/objects/models/SimplePublicObjectWithAssociations';
import {ApiException} from '@hubspot/api-client/lib/codegen/crm/objects/apis/exception';
import {ModelError} from '@hubspot/api-client/lib/codegen/crm/objects/models/ModelError';

const hubspotClientInstance = new hubspot.Client({ accessToken: '*'})
const isNotFoundError = (error: any): boolean => isErrorCode(error, 404);
const isErrorCode = (error: any, code: number): boolean =>
    getErrorCodeFor(error as ApiException<ModelError>) === code;
const getErrorCodeFor = ({ code }: ApiException<ModelError>): number => code || -1;
const getObject = async (
  objectType: string,
  objectProperties: Array<string>,
  id: string,
  idProperty?: string
): Promise<SimplePublicObjectWithAssociations | undefined> => {
  let object;
  try {
    const response = await hubspotClientInstance.crm.objects.basicApi.getById(
      objectType,
      id,
      objectProperties,
      undefined, // associations to check
      undefined, // paginate associations
      false,  // return archived results only
      idProperty
    );
    object = response;
  } catch (error) {
    if (!isNotFoundError(error)) {
      throw error;
    }
  }
  return object;
};

const main = async () => {
  let object = await getObject('2-7895244', ['class_id'], '110934259833' )
  console.log(object)
}
main()
