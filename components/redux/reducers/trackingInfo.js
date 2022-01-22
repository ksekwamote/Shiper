import { ActionSheetIOS } from "react-native";

const { changeTrackingInfo } = require("../actions/actions");


let initialState = [
    {
        "id": "trk_326111de6f6f4caaa6d33c9c7b199d97",
        "object": "Tracker",
        "mode": "test",
        "tracking_code": "EZ1000000001",
        "status": "pre_transit",
        "est_delivery_date": "2022-01-16T22:01:15Z",
        "carrier": "USPS",
        "tracking_details": [
          {
            "object": "TrackingDetail",
            "message": "Pre-Shipment Info Sent to USPS",
            "description": null,
            "status": "pre_transit",
            "status_detail": "status_update",
            "datetime": "2021-12-16T22:01:15Z",
            "source": "USPS",
            "carrier_code": null,
            "tracking_location": {
              "object": "TrackingLocation",
              "city": null,
              "state": null,
              "country": null,
              "zip": null
            }
          },
          {
            "object": "TrackingDetail",
            "message": "Shipping Label Created",
            "description": null,
            "status": "pre_transit",
            "status_detail": "status_update",
            "datetime": "2021-12-17T10:38:15Z",
            "source": "USPS",
            "carrier_code": null,
            "tracking_location": {
              "object": "TrackingLocation",
              "city": "HOUSTON",
              "state": "TX",
              "country": null,
              "zip": "77063"
            }
          }
        ],
        "carrier_detail": {
          "object": "CarrierDetail",
          "service": "First-Class Package Service",
          "container_type": null,
          "est_delivery_date_local": null,
          "est_delivery_time_local": null,
          "origin_location": "HOUSTON TX, 77001",
          "origin_tracking_location": {
            "object": "TrackingLocation",
            "city": "HOUSTON",
            "state": "TX",
            "country": null,
            "zip": "77063"
          },
          "destination_location": "CHARLESTON SC, 29401",
          "destination_tracking_location": null,
          "guaranteed_delivery_date": null,
          "alternate_identifier": null,
          "initial_delivery_attempt": null
        },
        "public_url": "https://track.easypost.com/djE6dHJrXzMyNjExMWRlNmY2ZjRjYWFhNmQzM2M5YzdiMTk5ZDk3",
        "fees": [
          {
            "object": "Fee",
            "type": "TrackerFee",
            "amount": "0.02000",
            "charged": false,
            "refunded": false
          }
        ],
        "created_at": "2022-01-16T22:01:15Z",
        "updated_at": "2022-01-16T22:01:15Z"
      },
      {
        "id": "trk_e1c88e8780574793892da7a5c25e7846",
        "object": "Tracker",
        "mode": "test",
        "tracking_code": "EZ3000000003",
        "status": "out_for_delivery",
        "est_delivery_date": "2022-01-19T17:19:54Z",
        "carrier": "USPS",
        "tracking_details": [
          {
            "object": "TrackingDetail",
            "message": "Pre-Shipment Info Sent to USPS",
            "description": null,
            "status": "pre_transit",
            "status_detail": "status_update",
            "datetime": "2021-12-19T17:19:54Z",
            "source": "USPS",
            "carrier_code": null,
            "tracking_location": {
              "object": "TrackingLocation",
              "city": null,
              "state": null,
              "country": null,
              "zip": null
            }
          },
          {
            "object": "TrackingDetail",
            "message": "Shipping Label Created",
            "description": null,
            "status": "pre_transit",
            "status_detail": "status_update",
            "datetime": "2021-12-20T05:56:54Z",
            "source": "USPS",
            "carrier_code": null,
            "tracking_location": {
              "object": "TrackingLocation",
              "city": "HOUSTON",
              "state": "TX",
              "country": null,
              "zip": "77063"
            }
          },
          {
            "object": "TrackingDetail",
            "message": "Arrived at USPS Origin Facility",
            "description": null,
            "status": "in_transit",
            "status_detail": "arrived_at_facility",
            "datetime": "2021-12-20T16:01:54Z",
            "source": "USPS",
            "carrier_code": null,
            "tracking_location": {
              "object": "TrackingLocation",
              "city": "NORTH HOUSTON",
              "state": "TX",
              "country": null,
              "zip": "77315"
            }
          },
          {
            "object": "TrackingDetail",
            "message": "Arrived at USPS Facility",
            "description": null,
            "status": "in_transit",
            "status_detail": "arrived_at_facility",
            "datetime": "2021-12-21T17:37:54Z",
            "source": "USPS",
            "carrier_code": null,
            "tracking_location": {
              "object": "TrackingLocation",
              "city": "COLUMBIA",
              "state": "SC",
              "country": null,
              "zip": "29201"
            }
          },
          {
            "object": "TrackingDetail",
            "message": "Arrived at Post Office",
            "description": null,
            "status": "in_transit",
            "status_detail": "arrived_at_facility",
            "datetime": "2021-12-21T20:28:54Z",
            "source": "USPS",
            "carrier_code": null,
            "tracking_location": {
              "object": "TrackingLocation",
              "city": "CHARLESTON",
              "state": "SC",
              "country": null,
              "zip": "29407"
            }
          },
          {
            "object": "TrackingDetail",
            "message": "Sorting Complete",
            "description": null,
            "status": "in_transit",
            "status_detail": "status_update",
            "datetime": "2021-12-22T02:08:54Z",
            "source": "USPS",
            "carrier_code": null,
            "tracking_location": {
              "object": "TrackingLocation",
              "city": "CHARLESTON",
              "state": "SC",
              "country": null,
              "zip": "29407"
            }
          },
          {
            "object": "TrackingDetail",
            "message": "Out for Delivery",
            "description": null,
            "status": "out_for_delivery",
            "status_detail": "out_for_delivery",
            "datetime": "2021-12-22T02:18:54Z",
            "source": "USPS",
            "carrier_code": null,
            "tracking_location": {
              "object": "TrackingLocation",
              "city": "CHARLESTON",
              "state": "SC",
              "country": null,
              "zip": "29407"
            }
          }
        ],
        "carrier_detail": {
          "object": "CarrierDetail",
          "service": "First-Class Package Service",
          "container_type": null,
          "est_delivery_date_local": null,
          "est_delivery_time_local": null,
          "origin_location": "HOUSTON TX, 77001",
          "origin_tracking_location": {
            "object": "TrackingLocation",
            "city": "NORTH HOUSTON",
            "state": "TX",
            "country": null,
            "zip": "77315"
          },
          "destination_location": "CHARLESTON SC, 29401",
          "destination_tracking_location": null,
          "guaranteed_delivery_date": null,
          "alternate_identifier": null,
          "initial_delivery_attempt": null
        },
        "public_url": "https://track.easypost.com/djE6dHJrX2UxYzg4ZTg3ODA1NzQ3OTM4OTJkYTdhNWMyNWU3ODQ2",
        "fees": [
          {
            "object": "Fee",
            "type": "TrackerFee",
            "amount": "0.02000",
            "charged": false,
            "refunded": false
          }
        ],
        "created_at": "2022-01-19T17:19:54Z",
        "updated_at": "2022-01-19T17:19:54Z"
      }
]

export default function trackingInfoReducer(state=initialState ,action){

    switch (action.type) {
        case "CHANGE TRACKING INFORMATION":
            return [...state ,action.payload]
        default:
            return state
    }

}