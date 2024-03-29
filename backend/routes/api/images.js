const express = require("express");
const router = express.Router();

const { Event, Group, Image, Membership } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

router.delete("/:imageId", requireAuth, async (req, res) => {
  const { user } = req;
  const { imageId } = req.params;

  const image = await Image.findByPk(imageId);

  if (!image) {
    res.status(404);
    return res.json({
      message: "Image couldn't be found",
      statusCode: 404,
    });
  }

  if (image.imageableType === "group") {
    const group = await Group.findOne({
      where: {
        id: image.imageableId,
      },
    });

    if (!group) {
      res.status(404);
      return res.json({
        message: "Group could not be found",
        statusCode: 404,
      });
    }

    const actualMembership = await Membership.findOne({
      where: {
        groupId: group.id,
        userId: user.id,
      },
    });

    if (!actualMembership) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    if (
      user.id === group.organizerId ||
      actualMembership.status === "co-host"
    ) {
      await image.destroy();
      res.status(200);
      return res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
  } else {
    const event = await Event.findOne({
      where: {
        id: image.imageableId,
      },
    });

    if (!event) {
      res.status(404);
      return res.json({
        message: "Event could not be found",
        statusCode: 404,
      });
    }

    const actualGroup = await Group.findOne({
      where: {
        id: event.groupId,
      },
    });

    if (!actualGroup) {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    const membership = await Membership.findOne({
      where: {
        userId: user.id,
        groupId: actualGroup.id,
      },
    });

    if (
      user.id === actualGroup.organizerId ||
      membership.status === "co-host"
    ) {
      await image.destroy();
      res.status(200);
      return res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      res.status(403);
      return res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
  }
});

module.exports = router;
