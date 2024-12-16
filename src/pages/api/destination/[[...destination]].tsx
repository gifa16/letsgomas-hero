/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { addData, deleteData, retriveData, retriveDataById, updateData } from '@/lib/firebase/service';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      const destination = await retriveDataById('destination', id as string);
      if (destination) {
        res.status(200).json({ status: true, statusCode: 200, message: 'success', data: destination });
      } else {
        res.status(404).json({ status: false, statusCode: 404, message: 'Data not found' });
      }
    } else {
      const destinations = await retriveData('destination');
      res.status(200).json({ status: true, statusCode: 200, message: 'success', data: destinations });
    }
  } else if (req.method === 'PUT') {
    const { destination }: any = req.query;
    const { data } = req.body;
    const token = req.headers.authorization?.split(' ')[1] || ' ';
    jwt.verify(token, process.env.NEXTAUTH_SECRET || ' ', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await updateData('destination', destination[1], data, (result: boolean) => {
          if (result) {
            res.status(200).json({
              status: true,
              statusCode: 200,
              message: 'success',
            });
          } else {
            res.status(400).json({
              status: false,
              statusCode: 400,
              message: 'failed',
            });
          }
        });
      } else {
        res.status(403).json({
          status: false,
          statusCode: 403,
          message: 'Access denied',
        });
      }
    });
  } else if (req.method === 'DELETE') {
    const { destination }: any = req.query;
    const token = req.headers.authorization?.split(' ')[1] || ' ';
    jwt.verify(token, process.env.NEXTAUTH_SECRET || ' ', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        await deleteData('destination', destination[1], (result: boolean) => {
          if (result) {
            res.status(200).json({
              status: true,
              statusCode: 200,
              message: 'success',
            });
          } else {
            res.status(400).json({
              status: false,
              statusCode: 400,
              message: 'failed',
            });
          }
        });
      } else {
        res.status(403).json({
          status: false,
          statusCode: 403,
          message: 'Access denied',
        });
      }
    });
  } else if (req.method === 'POST') {
    const token = req.headers.authorization?.split(' ')[1] || ' ';
    jwt.verify(token, process.env.NEXTAUTH_SECRET || ' ', async (err: any, decoded: any) => {
      if (decoded && decoded.role === 'admin') {
        let data = req.body;
        data.created_at = new Date();
        data.updated_at = new Date();
        data.average_rating = 0;
        data.total_reviews = 0;
        data.review = [];
        await addData('destination', data, (status: boolean, result: any) => {
          if (status) {
            res.status(200).json({
              status: true,
              statusCode: 200,
              message: 'success',
              data: result,
            });
          } else {
            res.status(400).json({
              status: false,
              statusCode: 400,
              message: 'failed',
              data: {},
            });
          }
        });
      } else {
        res.status(403).json({
          status: false,
          statusCode: 403,
          message: 'Access denied',
        });
      }
    });
  }
}