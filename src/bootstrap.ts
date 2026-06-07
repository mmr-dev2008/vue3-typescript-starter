import ApiRepository from '@/repositories/api.repository';

import LanguageService from '@/services/language.service';
import TokenService from '@/services/token.service';

import AuthenticateUser from '@/repositories/middleware/AuthenticateUser';

import HttpHeader from '@/enums/HttpHeader';
import MimeType from '@/enums/MimeType';

ApiRepository.setHeader(HttpHeader.CONTENT_TYPE, MimeType.APPLICATION_JSON);
ApiRepository.addResponseMiddleware(AuthenticateUser);

if (TokenService.isExist()) {
    ApiRepository.setHeader(HttpHeader.AUTHORIZATION, `Bearer ${TokenService.get()}`);
}
