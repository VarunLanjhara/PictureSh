import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).json({ error: "Unauthorised" });
    return;
  }
  const { imageId } = req.query;
  if (req.method === "PUT") {
    try {
      const imageexists = await prisma.image.findUnique({
        where: {
          id: parseInt(imageId as string),
        },
      });
      if (!imageexists) {
        res.status(404).json({ error: "Image not found" });
        return;
      }
      const isSaved = await prisma.save.findFirst({
        where: {
          imageId: parseInt(imageId as string),
          // @ts-ignore
          userId: session?.user?.id,
        },
      });
      if (isSaved === null) {
        await prisma.save.create({
          data: {
            imageId: parseInt(imageId as string),
            // @ts-ignore
            userId: session?.user?.id,
          },
        });
        const image = await prisma.image.findUnique({
          where: {
            id: parseInt(imageId as string),
          },
          include: {
            saves: true,
            likes: true,
            comments: {
              include: { user: true },
              orderBy: {
                createdAt: "desc",
              },
            },
            author: true,
          },
        });
        res.status(200).json(image);
      } else {
        await prisma.save.delete({
          where: {
            id: isSaved.id,
          },
        });
        const image = await prisma.image.findUnique({
          where: {
            id: parseInt(imageId as string),
          },
          include: {
            saves: true,
            likes: true,
            comments: {
              include: { user: true },
              orderBy: {
                createdAt: "desc",
              },
            },
            author: true,
          },
        });
        res.status(200).json(image);
      }
    } catch (error: any) {
      res.status(400).json({
        error: error.message,
      });
    }
  }
}