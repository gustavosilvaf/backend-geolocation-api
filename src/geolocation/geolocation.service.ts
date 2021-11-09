import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { SendAddressDto } from './dto/send-address.dto';
import { Locale } from './interfaces/geolocation.interface';
import { euclidean } from 'ml-distance-euclidean';
import { uniqBy, uniq, last } from 'lodash';

@Injectable()
export class GeolocationService {
  public async getLocation(sendAddressDto: SendAddressDto): Promise<any[]> {
    return await this.getAllLocales(sendAddressDto);
  }

  private async getAllLocales(sendAddressDto: SendAddressDto): Promise<any> {
    const googleAddresses: Locale[] = [];
    for (const address of sendAddressDto.addresses) {
      const response = await axios.get(process.env.MAPS_URL, {
        params: {
          address,
          key: process.env.GOOGLE_API,
        },
      });
      const [firstData] = response?.data?.results;

      if (!firstData)
        throw new NotFoundException(`Address: '${address}' not found`);
      googleAddresses.push({
        locale: firstData?.['formatted_address'],
        location: firstData?.geometry?.location,
      });
    }

    return this.getDistanceFromAll(googleAddresses);
  }

  private getDistanceFromAll(data: Locale[]) {
    const distances = [];

    data.forEach((locale) => {
      data.forEach((element) =>
        distances.push({
          from: locale.locale,
          to: element.locale,
          distance: euclidean(
            Object.values(locale.location),
            Object.values(element.location),
          ),
        }),
      );
    });
    const distancesWithoutRepeatHimSelf = distances.filter(
      (element) => !(element.from === element.to),
    );

    const consolidatedResult: Array<any> = uniqBy(
      GeolocationService.orderByDistance(distancesWithoutRepeatHimSelf),
      'distance',
    );

    const shortestDistance = {
      between: [consolidatedResult[0]?.from, consolidatedResult[0]?.to],
      distance: consolidatedResult[0].distance,
    };

    const greaterDistance = {
      between: [last(consolidatedResult)?.to, last(consolidatedResult).from],
    };

    return {
      shortestDistance,
      greaterDistance,
      orderByDistance: consolidatedResult,
    };
  }

  private static orderByDistance(locales) {
    return locales.sort((a, b) => b.distance - a.distance);
  }
}
